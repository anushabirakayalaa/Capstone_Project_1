# DAY - 18
->Zustand 
->Axios
->Cookies...(on cors and same origin httpOnly behavior)
->fetch (vs) Axios
->stores-authStore
->styles-common.js(for input feilds)
->dont make uneccesary api calls-they are expensive (cache)


### From UserProfile component,
Read articles of all AUthors
Display them in the form of Grid of cards
          1 card for extra  small
          2 cards for small
          3 cards for medium
          4 cards from large screen onwards


### From AuthorProfile component,
Read articles of his own
Display them in the form of Grid of cards
          1 card for extra  small
          2 cards for small
          3 cards for medium
          4 cards from large screen onwards

    When User /Author click on specific article from Articles list
    Navigate to "ArticleByID" component along with selected article
    Display the  article title, category, content along with author title & time stamps in IST format
 
    Note: In ARticleByID component, first check the article object is received from useLocation. Make API call to get that article by id only if it is not available with useLocation hook
# Files updated                   
->Header.jsx
->Register.jsx
->Login.jsx
->extra code added to server.js(error handling)



