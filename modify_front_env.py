# -*- coding: utf-8 -*-
##########################################################
# 
# Copyright (c) 2018 xyzq.com.cn, Inc. All Rights Reserved
#
##########################################################

"""
    初始化配置文件

    Authors: ZhuangChunPing(zhuangchp@xyzq.com.cn)
    Date: 2018/3/1 下午3:55
"""

import sys

def file_set_no_contain(set_file, contain_str, no_contain_str, newstr):
    '''
    文件内容替换，将set_file中包含contain_str且不包含no_contain_str的行
    整行替换成newstr
    '''
    input = open(set_file)
    lines = input.readlines()
    input.close()

    output = open(set_file, 'w')

    for line in lines:
        temp = line
        if not line:
            break

        temp = temp.strip()
        if (contain_str in temp) and (no_contain_str not in temp) and (temp.startswith(contain_str)):
            temp = newstr + "\n"
            print "--->", temp
            output.write(temp)
            continue
        output.write(line)
    output.close()


if __name__ == "__main__":

    root_path = sys.path[0]
	
    file_set_no_contain(root_path + "/asset/www/index.html", "var isDebug", "111111", "var isDebug = false;\n")