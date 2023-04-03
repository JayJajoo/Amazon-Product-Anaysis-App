import sys
sys.path.insert(0,"C:/Users/LEGION/AppData/Local/Programs/Python/Python39/Lib/site-packages")
from requests_html import HTMLSession
import json

class Reviews:
    def __init__(self,asin) -> None:
        self.asin=asin
        self.session=HTMLSession()
        self.headers = {'User-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'}
        self.url=f'https://www.amazon.in/product-reviews/{self.asin}/ref=cm_cr_arp_d_viewopt_srt?ie=UTF8&reviewerType=all_reviews&sortBy=recent&pageNumber='
    
    def pagiation(self,page):
        r=self.session.get(self.url+str(page))
        if not r.html.find('div[data-hook=review]'):
            return False
        else:
            return (r.html.find('div[data-hook=review]'))
    
    def parseImage(self):
        r=self.session.get(self.url+str(1))
        if not r.html.find('img[data-hook=cr-product-image]'):
            return False
        else:
            image = r.html.find('img[data-hook=cr-product-image]')
            with open('C:/Users/LEGION/Desktop/sin_project/server/OutputData/image.txt','w') as f:
                for i in image:
                    f.write(i.attrs['src'])
            return True

    def parse(self,reviews):
        total=[]
        for review in reviews:
            title=review.find('a[data-hook=review-title] span',first=True).text
            rating=review.find('i[data-hook=review-star-rating] span',first=True).text
            body=review.find('span[data-hook=review-body]',first=True).text.replace("\n",'').strip()
            data={
                'title' : title ,
                'rating': rating,
                'body' : body
            }
            total.append(data)
        return total
    
    def save(self,results):
        res=[]
        with open('C:/Users/LEGION/Desktop/sin_project/server/OutputData/reviews.json','w') as f:
            print(self.asin)
            for pages in results:
                for reviews in pages:
                    res.append(reviews)
            json.dump(res,f)
if __name__=="__main__":
    amz = Reviews(str(sys.argv[1]))#"B0BP1PN7DX"
    results=[]
    #amz.parseImage()
    for i in range(10):
        reviews=amz.pagiation(i)
        if reviews is not False:
            results.append(amz.parse(reviews))
    amz.save(results)