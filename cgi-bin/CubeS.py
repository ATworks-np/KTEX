import numpy as np
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from numpy.random import *
plt.rcParams['font.family'] = 'Arial'
plt.rcParams['mathtext.fontset'] = 'stix'
plt.rcParams['font.size'] = 20
def draw(texture):
    fig = plt.figure()
    ax = Axes3D(fig)

    ax.set_xlabel("")
    ax.set_ylabel("")
    ax.set_zlabel("")

    ax.set_xlim(0, 360)
    ax.set_ylim(0, 180)
    ax.set_zlim(0, 360)
    ax.get_proj = lambda: np.dot(Axes3D.get_proj(ax), np.diag([1, 0.5, 1, 1]))
    #texture[:,0]=nom(texture[:,0])
    #texture[:,1]=nom(texture[:,1])
    #texture[:,2]=nom(texture[:,2])
    ax.plot(texture[:,0], texture[:,1],texture[:,2], "o", color="#000000", ms=0.5, mew=0.5)
    plt.yticks(range(0,180,90))
    plt.xticks(range(0,360,90))
    ax.set_zticks(range(0,360,90))
    plt.show()
def draw2(texture,textureL):
    fig = plt.figure()
    ax = Axes3D(fig)

    ax.set_xlabel("X-axis")
    ax.set_ylabel("Y-axis")
    ax.set_zlabel("Z-axis")

    ax.set_xlim(0, 360)
    ax.set_ylim(0, 360)
    ax.set_zlim(0, 360)
    ax.plot(texture[:,0], texture[:,1],texture[:,2], "o", color="#000000", ms=1, mew=0.5)
    plt.show()
def unit(s,vol,c):
    s *= s
    s0 = 0.67
    R = np.zeros([3,3])
    if c == 0:
        R = np.array([[-1.414,0, 1.414],
                      [     0,2,     0],
                      [-1.414,0,-1.414]])/2
    else:
        R = np.array([[ 1.414,0, 1.414],
                      [     0,2,     0],
                      [-1.414,0, 1.414]])/2
    texture = np.zeros([int(vol*s0),3])
    texture[:,0] = rand(int(vol*s0))*90*1.414

    mat   = np.array([[s,0],
                      [0,s]])
    texture[:,1:] = np.random.multivariate_normal([0,0],mat,int(vol*s0))
    texture = np.dot(texture,R)+np.array([90,0,0])
    for i in range(texture.shape[0]):
        if texture[i,2]<0:
            texture[i,2]+=90
        elif texture[i,0]>90:
            texture[i,0]-=90
        elif texture[i,0]<0:
            texture[i,0]+=90
        elif texture[i,2] > 90:
            texture[i,2]-=90
        else:
            pass
        if texture[i,1]<0:
            texture[i,1]*=-1

    mat   = np.array([[s,0,0],
                      [0,s,0],
                      [0,0,s]])
    texture0 = np.random.multivariate_normal([0,0,0],mat,int(vol*(1-s0)))
    for i in range(texture0.shape[0]):
        if texture0[i,1]>0:
            texture0[i,1]*=-1
        if texture0[i,0]<0:
            if texture0[i,2]>0:
                texture0[i]+=np.array([90,0,0])
            else:
                texture0[i]+=np.array([90,0,90])
        elif texture0[i,2]<0:
            texture0[i]+=np.array([0,0,90])
        if texture[i,1]<0:
            texture[i,1]*=-1
    texture0 += np.array([0,90,0])
    return np.append(texture,texture0,0)
def geCube(s,vol):
    texture = np.array([[0,0,0]])
    for i in range(4):
        for j in range(4):
            for k in range(2):
                buf = unit(s,100,k)
                if k == 0:
                    texture = np.append(texture,buf+np.array([i*90,0,j*90]),0)
                else:
                    buf[:,1] *= -1
                    buf += np.array([i*90,180,j*90])
                    texture = np.append(texture,buf,0)
    texture = np.delete(texture,0,0)
    ind = np.array(np.random.rand(vol)*texture.shape[0],dtype=int)
    return texture[]
def geS(s,vol):
    V = 100
    texture = np.array([[0,0,0]])
    S = np.array([
[  59,  37,  63],
[ 239, 143, 117],
[ 239, 143, 297],
[  59,  37, 243],
[ 307,  74,  56],
[ 127, 106, 304],
[ 307,  74, 236],
[ 127, 106, 124],
[ 206,  58,  19],
[  26, 122, 161],
[  26, 122, 341],
[ 206,  58, 199],
[ 307,  74, 146],
[  26, 122,  71],
[  59,  37, 333],
[ 127, 106,  34],
[ 206,  58, 289],
[  59,  37, 153],
[ 239, 143,  27],
[ 239, 143, 207],
[ 206,  58, 109],
[ 307,  74, 326],
[  26, 122, 251],
[ 127, 106, 214],

[  53,  75,  34],
[ 233, 105, 146],
[ 233, 105, 326],
[  53,  75, 214],
[ 302,  37,  26],
[ 122, 143, 334],
[ 302,  37, 206],
[ 122, 143, 154],
[ 153,  57,  72],
[ 333, 123, 108],
[ 333, 123, 288],
[ 153,  57, 252],
[ 302,  37, 116],
[ 333, 123,  18],
[  53,  75, 304],
[ 122, 143,  64],
[ 153,  57, 342],
[  53,  75, 124],
[ 233, 105,  56],
[ 233, 105, 236],
[ 153,  57, 162],
[ 302,  37, 296],
[ 333, 123, 198],
[ 122, 143, 244],

[  27,  58,  20],
[ 207, 122, 160],
[ 207, 122, 340],
[  27,  58, 200],
[ 241,  37,  61],
[  61, 143, 299],
[ 241,  37, 241],
[  61, 143, 119],
[ 128,  73,  56],
[ 308, 107, 124],
[ 308, 107, 304],
[ 128,  73, 236],
[ 241,  37, 151],
[ 308, 107,  34],
[  27,  58, 290],
[  61, 143,  29],
[ 128,  73, 326],
[  27,  58, 110],
[ 207, 122,  70],
[ 207, 122, 250],
[ 128,  73, 146],
[ 241,  37, 331],
[ 308, 107, 214],
[  61, 143, 209]])
    mat   = np.array([[s,0,0],
                      [0,s,0],
                      [0,0,s]])
    for i in range(S.shape[0]):
        buf = np.random.multivariate_normal(S[i],mat,V)
        texture = np.append(texture,buf,0)
    texture = np.delete(texture,0,0)
    ind = np.array(np.random.rand(vol)*texture.shape[0],dtype=int)
    return texture[ind]
if __name__ == '__main__':
    draw(geCube(7,1000))
