from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Product
from base.serializers import ProductSerializer
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk) # search ptu co _id = pk trên url
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
    