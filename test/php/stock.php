<?php
//Возвращение Цены акций, т.е. случайного числа в диапазоне 93.5 - 93.9
$price = mt_rand(0,4);
$price = $price / 10 + 93.5;
echo $price;