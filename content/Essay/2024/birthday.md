---
title: 人间凑数的日子
date: 1996-01-13 00:00:00
taxonomies:
 tags: ["随笔"]
---

<html>
	<body>
		<script LANGUAGE="JavaScript">
		var s1 = '1996-01-13';
		s1 = new Date(s1.replace(/-/g, "/"));
		s2 = new Date();//当前日期
		var days = s2.getTime() - s1.getTime();
		var today = new Date();
		var time = parseInt(days / (1000 * 60 * 60 * 24));
		var yearsDiff = today.getFullYear() - s1.getFullYear();
		document.write("<center>这是我在人间的第 " + yearsDiff + " 个年头</center>");
		document.write("<center>也是在人间凑数的第 ",time," 天</center>");
		</script>
	</body>
</html>
</html>