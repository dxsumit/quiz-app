# quiz-app

Node.js application that enables users to generate and join quizzes with a time limit. The application is a RESTful API that facilitates the creation and retrieval of quizzes.

### Features
<ul>
  <li> Create an quiz with question and options with start and end time. </li>
  <li> Each quiz will expire after their end time and result can be accessed only after 5min of quiz end. </li>
  <li> Status of each quiz whether its active, inactive or finished is determined automatically with user defined middleware. </li>
  <li> Quiz data is stored in MongoDB database. </li>
</ul>

### Operations
API - <a href="https://quiz-app-lxt4.onrender.com/api/v1"> https://quiz-app-lxt4.onrender.com/api/v1 </a>

### Creation of Quiz [POST Method]
URL - <a href="https://quiz-app-lxt4.onrender.com/api/v1/quizzes"> https://quiz-app-lxt4.onrender.com/api/v1/quizzes </a>

Structure of body to be passed
```
{
    "question": "What is your qestion?",
    "options": [
        "Option P",
        "Option Q",
        "Option R",
        "Option S"
    ],
    "rightAnswer": 2,
    "startTime": "May 03, 2023 16:57:00",
    "endTime": "May 03, 2023 17:00:00"
}
```

Here in this case, we are passing all the parameters, but fields like <b>startTime</b> and <b>endTime</b> are optional by default they are current day and time and next day for endTime. <br>
Validations has also been implemented here like rightAnswer should not be out of range of options. Options can’t be less than 2 or more than 10.
<br>

### Get Active Quizzes [GET Method]
URL - <a href="https://quiz-app-lxt4.onrender.com/api/v1/quizzes/active"> https://quiz-app-lxt4.onrender.com/api/v1/quizzes/active </a>
<br>
Status of the quiz is being managed by middleware, which will keep the status of quizzes updated, if the quiz end time is passed it will be considered as <b> finished </b>. <br>
If the quiz is not started yet it will be considered as <b>inactive</b> and other are <b> active </b> quizzes. <br>
Middleware will update status of quizzes upon each request. <br>


### Get Result [GET Method]
URL - <a href="https://quiz-app-lxt4.onrender.com/api/v1/quizzes/:id/result"> https://quiz-app-lxt4.onrender.com/api/v1/quizzes/:id/result </a>
<br>
We can get the result of the quiz with this method. <br>
Result can only be accessed after 5min of quiz end. You can not see result before that. <br>
To access the particular quiz we need to pass the id of the quiz as a parameter. <br>


### Get All Quizzes [GET Method]
URL - <a href="https://quiz-app-lxt4.onrender.com/api/v1/quizzes/all"> https://quiz-app-lxt4.onrender.com/api/v1/quizzes/all </a>
<br>
We can get all the quizzes that are uploaded there with this method. <br>
We can get the details but results are not to be allowed to shown in this method.


## Working ScreenShots

<center> 
  <div>
      <img src="https://user-images.githubusercontent.com/58907200/235933216-2643c942-a0fb-4b97-94c9-7ec55d9bcb28.png" width=30% height=30%>
      <img src="https://user-images.githubusercontent.com/58907200/235933235-7511be01-1100-476d-9676-2f51773b110a.png" width=30% height=15%>
      <img src="https://user-images.githubusercontent.com/58907200/235933767-4572fad9-c9e9-4ab4-b1dc-8ac77e658af3.png" width=30% height=15%> 
      <img src="https://user-images.githubusercontent.com/58907200/235934152-a3a84045-1c7b-4cd0-9504-919776a62251.png" width=30% height=30%>
      <img src="https://user-images.githubusercontent.com/58907200/235934427-f13d42ec-df89-4721-96c5-6a2a48f1d670.png" width=30% height=30%> 
      <img src="https://user-images.githubusercontent.com/58907200/235934923-0d906327-1a65-4e9b-ab74-b1fb0f7547dd.png" width=30% height=30%> 
  </div>

</center>


