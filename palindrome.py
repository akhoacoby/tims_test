import math

def palindrome(str):
     string_long = len(str)
     mid = math.ceil(string_long / 2)
     i = 0
     check = False
     while (i < mid and (str[i]==str[string_long-i-1])):
          i+=1
     if (i == mid):
          check = True
     return check


#Test:
print(palindrome('kayak'))
print(palindrome('abba'))
print(palindrome(')(()'))
print(palindrome('abab'))
print(palindrome('tims'))

