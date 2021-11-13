
import numpy as np
from PIL import Image
import sys
import json
from st import network
import nnabla as nn
import nnabla.functions as F
import nnabla.parametric_functions as PF
import convert

import os
import cgi

if 'QUERY_STRING' in os.environ:
    query = cgi.parse_qs(os.environ['QUERY_STRING'])
else:
    query = {}

vectorC = np.array([[0.06,300],[0.06,300]])
def geSS(Texture):
    direct = np.array([1,1,1])

    size = 128
    Texture_pole = convert.convert(Texture,direct)
    Texture_pole = np.array([Texture_pole/2*size/2+size/2],dtype="int32")
    img   = np.zeros([size,size])
    for i,j in Texture_pole[0]:
        if(i<size and j<size and i>0 and j>0):
            img[i,j] += 1
    img = img/12.0*255
    for i in range(size):
        for j in range(size):
            img[i,j]= -(img[i,j]-255)*(img[i,j]-255)/255+255

    nn.clear_parameters()
    x = nn.Variable((1,1,128,128))
    y1,y2 = network(x)
    filename='D:\\KoenumaKouta\\python3\\deep\\CubeSTex\\SScurve3.files\\20180703_145744\\parameters.h5'
    nn.parameter.load_parameters(filename)
    x.d[0,0] = img/255
    y1.forward()
    y2.forward()
    return y1.d[0],y2.d[0]


texture = np.genfromtxt("C:\\Users\\Arif\\Desktop\\html\\texture.txt", delimiter='')
optcurve,optvector=geSS(texture)
optvector*=vectorC
y  =  np.arange(0,1,1/50)

RD_s = y*optvector[0,1]
RD_e = optcurve[:,0]*optvector[0,0]
TD_s = y*optvector[1,1]
TD_e = optcurve[:,1]*optvector[1,0]
json_content = json.dumps({'1_1':{'RD_e': [int(RD_s[i]) for i in range(50)],
                                  'RD_s': [int(RD_e[i]) for i in range(50)],
                                  'TD_e': [int(TD_e[i]) for i in range(50)],
                                  'TD_s': [int(TD_s[i]) for i in range(50)]}})

print ("Content-Type:text/javascript")
print()
print ("SSback(%s);"%(json_content))
