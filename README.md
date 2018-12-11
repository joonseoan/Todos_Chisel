# Name : To-do List Management
## Javascript Library : React.js
## CSS : Bootstrap v3 / v4
## Setup
### 1. Must install npm ( or yarn)
### 2. Make a root folder : ex) mkdir Chisel
### 3. At the root folder : ex) npm install -g create-ract-app
### 4. At the root folder : ex) create-react-app todos
### 5. Copy the follwings
<link rel="stylesheet" type="text/css" href="../style/style.css" />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
      integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
      crossorigin="anonymous"
    />

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
      crossorigin="anonymous"
    />

    <link
      href="https://fonts.googleapis.com/css?family=Ubuntu"
      rel="stylesheet"
    />
    <link
      async
      href="https://fonts.googleapis.com/css?family=Warnes"
      data-generated="https://enjoycss.com"
      rel="stylesheet"
      type="text/css"
    />
    <title>Todos</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
     <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
      integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
      crossorigin="anonymous"
    ></script>
  </body>
</html>



- library and API : react-stripe, react-google-maps, react-slick, react-modal, moment
###  - css control : react-bootstrap, wow.js
## Back-end : Node.js (express and mocha)
###  - library : stripe, mongoose, bcrypt
## Database : MongoDB

## Application Concept :
#### Weather always impacts on customer's menu choice in a restaurant. As enclosing this real-time weather information and recommendation menu (Current Specials) based on the weather information, 
#### the application helps customers intuitively choose and order their favorit foods in a bit.

## App Structure :
#### Restaurant Locations
#### Real-Time Weather based on Locations
#### Recommendation Menu based on Preset weather Information
#### Menu Order with Detailed Food Information enclosing Customer's Reviews
#### Guesbooks(containing Customer's Food Evaluation and Recommendation)
#### Login & Guestbook Management (Delete Customer's post)

#### 1. Restaurant Location and Weather Information
####      - displaying local weather information 
####      - updating weather information every 5 minutes 
####      - and utilizing OpenWeatherMap and GoogleMap modules
##### [Toronto Restaurant]
##### ![Main Page1](/client/public/images/git_readme/location.PNG)
##### [Vancouver Restaurant]
##### ![Main_Page2](/client/public/images/git_readme/location2.PNG)
#### 2. Recommendatiion Menus  
