import nnabla as nn
import nnabla.functions as F
import nnabla.parametric_functions as PF

def network(x,test=False):
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
