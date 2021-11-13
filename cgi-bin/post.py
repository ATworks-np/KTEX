import cgi, cgitb, os,json
import numpy as np
from PIL import Image
import nnabla as nn
import nnabla.functions as F
import nnabla.parametric_functions as PF

def network(x, test=False):
    # Input:x -> 1,128,128

    # Convolution -> 16,25,25
    h = PF.convolution(x, 16, (7,7), (0,0), (5,5), name='Convolution')
    # ELU
    h = F.elu(h, 1)
    # SumPooling -> 16,13,13
    h = F.sum_pooling(h, (2,2), (2,2), False)

    # Convolution_2 -> 32,3,3
    h = PF.convolution(h, 32, (7,7), (1,1), (3,3), name='Convolution_2')
    # ELU_2
    h = F.elu(h, 1)
    # MaxPooling -> 32,1,1
    h = F.max_pooling(h, (3,3), (3,3), False)

    # Affine -> 200,2
    h1 = PF.affine(h, (200,2), name='Affine')

    # Affine_3 -> 200,2
    h2 = PF.affine(h, (200,2), name='Affine_3')
    # ELU_3
    h1 = F.elu(h1, 1)
    # ELU_4
    h2 = F.elu(h2, 1)
    # Affine_2 -> 50,2
    h1 = PF.affine(h1, (50,2), name='Affine_2')
    # Affine_5 -> 50,2
    h2 = PF.affine(h2, (50,2), name='Affine_5')

    # SquaredError
    #h1 = F.squared_error(h1, y1)
    # ELU_5
    h2 = F.elu(h2, 1)
    # Affine_4 -> 2,2
    h2 = PF.affine(h2, (2,2), name='Affine_4')

    # SquaredError_2
    #h2 = F.squared_error(h2, y2)
    return h1, h2
def f(x):
    c = 0
    x[np.where(x>255)]=255
    x[np.where(x<0)]=255
    #return 123*(np.tanh((x/123-1)*2)+1)
    #return -(x-255)*(x-255)/255+255
    return x
def geSS(img):
    nn.clear_parameters()
    x = nn.Variable((1,1,128,128))
    y1,y2 = network(x)
    filename='./cgi-bin/2_1.h5'
    nn.parameter.load_parameters(filename)
    x.d[0,0] = img/255.0
    y1.forward()
    y2.forward()
    return y1.d[0],y2.d[0]
SIZE=128

cgitb.enable()

form = cgi.FieldStorage()
enc_json = form.getfirst("enc_json", "")
dec_json = json.loads(enc_json)
Texture_pole  = np.array([dec_json["r"]*np.cos(dec_json["theta"]),
                          dec_json["r"]*np.sin(dec_json["theta"])]).T
np.savetxt('test_x.txt',Texture_pole*32+np.array([SIZE/2,SIZE/2]), delimiter=',')
img   = np.zeros([SIZE, SIZE],dtype='float')
for j,i in Texture_pole*32+np.array([SIZE/2,SIZE/2]):
    if(i<SIZE and j<SIZE and i>0 and j>0):
        img[int(i),int(j)] += 1.0
    #m = np.append(m,np.max(img))
img = img/10.0*255.0
img=f(img)
pil_img_f = Image.fromarray(np.uint8(img))


vectorC = np.loadtxt('./cgi-bin/ind.csv',delimiter=',')
ave = vectorC[:2]
std = vectorC[2:]
optcurve,optvector=geSS(img)
optvector*=std
optvector+=ave
y  =  np.arange(0,1,1/50.0)
RD_s = y*optvector[0,1]
RD_e = optcurve[:,0]*optvector[0,0]
TD_s = y*optvector[1,1]
TD_e = optcurve[:,1]*optvector[1,0]
json_content = json.dumps({'1_1':{'RD_e': [int(RD_e[i]*10000) for i in range(50)],
                                  'RD_s': [int(RD_s[i]) for i in range(50)],
                                  'TD_e': [int(TD_e[i]*10000) for i in range(50)],
                                  'TD_s': [int(TD_s[i]) for i in range(50)]}})



pil_img_f.save('./test.png')
print ("Content-Type:text/javascript")
print()
print ("SSback(%s);"%(json_content))
