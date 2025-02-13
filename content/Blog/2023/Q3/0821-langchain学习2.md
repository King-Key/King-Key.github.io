---
title: 🖋 langchain学习2
date: 2023-08-21 19:21:25
---

> langchain+chatglm2-6b

<!--more-->

## 1、langchain中的主要模块

- 模型（models）
- 提示（prompts)
- 内存（memory）
- 索引（indexes）
- 链（chains）
- 代理（agents)

## 2、langchain+chatglm2-6b

- Chatglm2-6b api（官方代码），先``` python api.py```进行运行

```python
from fastapi import FastAPI, Request
from transformers import AutoTokenizer, AutoModel
import uvicorn, json, datetime
import torch

DEVICE = "cuda"
DEVICE_ID = "0"
CUDA_DEVICE = f"{DEVICE}:{DEVICE_ID}" if DEVICE_ID else DEVICE


def torch_gc():
    if torch.cuda.is_available():
        with torch.cuda.device(CUDA_DEVICE):
            torch.cuda.empty_cache()
            torch.cuda.ipc_collect()


app = FastAPI()


@app.post("/")
async def create_item(request: Request):
    global model, tokenizer
    json_post_raw = await request.json()
    json_post = json.dumps(json_post_raw)
    json_post_list = json.loads(json_post)
    prompt = json_post_list.get('prompt')
    history = json_post_list.get('history')
    max_length = json_post_list.get('max_length')
    top_p = json_post_list.get('top_p')
    temperature = json_post_list.get('temperature')
    response, history = model.chat(tokenizer,
                                   prompt,
                                   history=history,
                                   max_length=max_length if max_length else 2048,
                                   top_p=top_p if top_p else 0.7,
                                   temperature=temperature if temperature else 0.95)
    now = datetime.datetime.now()
    time = now.strftime("%Y-%m-%d %H:%M:%S")
    answer = {
        "response": response,
        "history": history,
        "status": 200,
        "time": time
    }
    log = "[" + time + "] " + '", prompt:"' + prompt + '", response:"' + repr(response) + '"'
    print(log)
    torch_gc()
    return answer


if __name__ == '__main__':
    model_path = "./chatglm2-6b-int4/"
    tokenizer = AutoTokenizer.from_pretrained("THUDM/chatglm2-6b", trust_remote_code=True)
    model = AutoModel.from_pretrained(model_path, trust_remote_code=True).cuda()

    # 多显卡支持，使用下面三行代替上面两行，将num_gpus改为你实际的显卡数量
    # model_path = "THUDM/chatglm2-6b"
    # tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
    # model = load_model_on_gpus(model_path, num_gpus=2)
    model.eval()
    uvicorn.run(app, host='0.0.0.0', port=8000, workers=1)
```

- langchain中使用chatglm

```Python
from langchain.llms import ChatGLM
from langchain import PromptTemplate, LLMChain

template = """{question}"""
prompt = PromptTemplate(template=template, input_variables=["question"])
# ChatGLM api server
endpoint_url = "http://127.0.0.1:8000/"

llm = ChatGLM(
    endpoint_url=endpoint_url,
    max_token=80000,
    history=[["我将从美国到中国来旅游，出行前希望了解中国的城市", "欢迎问我任何问题。"]],
    top_p=0.9,
    model_kwargs={"sample_model_args": False},
)

llm_chain = LLMChain(prompt=prompt, llm=llm)
question = "北京和上海两座城市有什么不同？"

print(llm_chain.run(question))
```

- 最后运行即可