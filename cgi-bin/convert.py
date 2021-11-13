import numpy as np
import math

def convert(phi,direct):
    poler = np.zeros([phi.shape[0],2])
    for i in range(phi.shape[0]):
        a  = phi[i,0]*math.pi/180-math.pi/2
        b  = phi[i,1]*math.pi/180
        c  = phi[i,2]*math.pi/180+math.pi/2
        R1 = np.array([[ math.cos(a) , math.sin(a),0],
                       [-math.sin(a) , math.cos(a),0],
                       [0            , 0          ,1]])
        R2 = np.array([[ math.cos(b) ,0, -math.sin(b)],
                       [ 0           ,1, 0           ],
                       [ math.sin(b) ,0, math.cos(b)]])
        R3 = np.array([[ math.cos(c) , math.sin(c),0],
                       [-math.sin(c) , math.cos(c),0],
                       [0            , 0          ,1]])
        R  = np.dot(np.dot(R3,R2),R1).T
        direct = direct/np.linalg.norm(direct)
        o  = np.dot(R,direct)
        poler[i,0] = 2*o[0]/(1+o[2])
        poler[i,1] = 2*o[1]/(1+o[2])
    return poler

def convert2(phi,direct):
    poler = np.zeros([phi.shape[0],3])
    for i in range(phi.shape[0]):
        a  = phi[i,0]*math.pi/180-math.pi/2
        b  = phi[i,1]*math.pi/180
        c  = phi[i,2]*math.pi/180+math.pi/2
        R1 = np.array([[ math.cos(a) , math.sin(a),0],
                       [-math.sin(a) , math.cos(a),0],
                       [0            , 0          ,1]])
        R2 = np.array([[ math.cos(b) ,0, -math.sin(b)],
                       [ 0           ,1, 0           ],
                       [ math.sin(b) ,0, math.cos(b)]])
        R3 = np.array([[ math.cos(c) , math.sin(c),0],
                       [-math.sin(c) , math.cos(c),0],
                       [0            , 0          ,1]])
        R  = np.dot(np.dot(R3,R2),R1).T
        direct = direct/np.linalg.norm(direct)
        poler[i]  = np.dot(R,direct)
    return poler
