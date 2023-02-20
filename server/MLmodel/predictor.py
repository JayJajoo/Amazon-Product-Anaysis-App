import json,joblib,pickle,numpy as np
f = open('C:/Users/LEGION/Desktop/sin_project/server/OutputData/reviews.json')
lr = joblib.load('C:/Users/LEGION/Desktop/sin_project/server/MLmodel/model.pkl')
tvec = pickle.load(open("C:/Users/LEGION/Desktop/sin_project/server/MLmodel/tfidf.pkl", 'rb'))
data = json.load(f)
results=[]
for i in data:
    if(i["body"]!=""):
        demo_review = np.array([i['body']])
        demo_review_X_test = tvec.transform(demo_review)
        rev_pred=lr.predict(demo_review_X_test)
        final_pred=''
        if(rev_pred[0]==0):
            final_pred="Negative"
        else:
            final_pred="Positive"
        results.append({
                    'title' : i["title"] ,
                    'rating': i["rating"],
                    'body' : i["body"],
                    "review" : final_pred 
        })
f.close()
with open('C:/Users/LEGION/Desktop/sin_project/server/OutputData/preditions.json','w') as f:
    json.dump(results,f)