
EASY + 1day
NORMAL + 1hour
HARD + 1min


+--------------------------------------------------------------------------------------------------------+
| Card 										           								 					 |
+--------------------------------------------------------------------------------------------------------|
| repetition 	|	Grade	| Current DateTime	| Prev DateTime 	| Interval 	     | Next DateTime	 |
|------------------------------------------------------------------------------------+-------------------|
| 1.	        |	NORMAL	| 15.14.2016 14:41	| NONE				| + 1 Hour		 | 15.14.2016 15:41	 |
|------------------------------------------------------------------------------------+-------------------|
| 2.  	        |   EASY	| 15.14.2016 16:00	| 15.14.2016 14:41	| + 25 Hours	 | 16.14.2016 17:00	 |
|------------------------------------------------------------------------------------+-------------------|
| 3.  	        |   HARD	| 16.14.2016 18:00	| 15.14.2016 16:00	| ?				 |					 |
|------------------------------------------------------------------------------------+-------------------|
| 4.  	        | 	NORMAL 	|					|					| ?				 |					 |
+--------------------------------------------------------------------------------------------------------+

ofsset = f(n, level, prevOffset) 


1. f1 = f(1, norm, 0) =  norm <> 1 = 1h
2. f2 = f(2, ease, f1) = easy <> 1h = 24h + 2*1h = 25h
3. f3 = f(3, hard, f2) = hard <> f2 = 1min
4. f4 = f(4, norm, f3) = norm <> 1min = 1h + 4*1min
5. f5 = f(5, easy, f4) = easy <> 1.4h = 24h + 5*1h.1min
6. f6 = f(6, hard, f5) = hard <> 30h = 1min 
7. f7 = f(7, norm, f6) = norm <> 1min = 1h + 7*1min;
8. f8 = f(8, easy, f7) = easy <> 1.07h = 24h + 8*1h;
9. f9 = f(9, easy, f7) = easy <> 32h = 24h
next = currentDateTime + offset







