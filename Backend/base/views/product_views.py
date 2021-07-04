from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from base.models import Product, Review
from base.serializers import ProductSerializer
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def getProducts(request): 
    query = request.query_params.get('keyword') # {{URL}}/products/?keyword=Kim
    print('query:', query) # Kim
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query) # lấy ra các product.name có chứa query bên trong
    
    page = request.query_params.get('page')
    paginator = Paginator(products, 16)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        print('nunu 1')
        products = paginator.page(1)
        print(products)
    except EmptyPage:
        print('nunu 2')
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    print(Product.objects.filter(rating__gte=4))
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:8]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk) # search ptu co _id = pk trên url
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data
    product = Product.objects.create(
        user=user,
        name=data['name'],
        image=data['image'],
        brand='PNJ',
        category=data['category'],
        description=data['description'],
        rating=4,
        numReviews=0,
        price=data['price'],
        countInStock=20
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.image = data['image']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.rating = data['rating']
    product.numReviews = data['numReviews']
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    productDelete = Product.objects.get(_id=pk)
    productDelete.delete()
    return Response('Delete product success')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    # Lấy review của product mà do user này đăng có tồn tại không
    alreadyExists = product.review_set.filter(user=user).exists()
    print(alreadyExists)
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        # lấy tất cả review của product này (trong Review có product là khoá ngoại)
        reviews = product.review_set.all()
        print(reviews)
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
        