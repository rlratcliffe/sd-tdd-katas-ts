# Greeting Service Kata

## Welcome!

Hello developer! :wave: At the _HELLO WORLD! Inc._ company we are excited to develop and release a new idea into the market! We want to build a new service to send customized greeting messages to our users.

**Here you'll find few requirements**

* The service have to expose an HTTP API which can be called from other HTTP clients.

## Feature One

_Just a Greeting_

```
When a greeting message is requested
Then the system will reply with "Hello my friend!"
```

## Feature Two

_Greeting a User with a customized message!_

```
When a User with the name Joe request a greeting message
Then the system will reply with a customized message that says:
"Hello Joe!"
```

## Feature Three

_Greeting a User by choosing a random greeting message from a set of messages_

```
When a User with the name Joe request a greeting message
Then the system will reply with a customized message that says:
"Hey Joe, nice to see you here!"
```

**List of predefined messages**

- `Hello {User}!`
- `Hey {User}, nice to see you here!`
- `{User} welcome back!`
- `Have a splendid day {User}.`

## Feature Four

_Greeting a User by choosing a greeting message from a predefined set of messages, **based on the time of the day**._

**Requesting a greeting message early in the morning**

```
When a User with the name Joe request a greeting message
And the time is early in the morning
Then the system will reply with a customized message that says:
"Good morning, Joe! The sun is high and shining!"
```

**List of predefined messages based on the time**

- **Morning (from 7 AM to 11 AM)** :sunny:
    - `Good morning, {User}! The sun is high and shining!`
    - `Hey {User}, nice to see you here!`
    - `{User} welcome back!`
    - `Have a splendid day {User}.`
- **The rest of the day (from 12 PM to 8 PM)** :clock3:
    - `Hello {User}!`
    - `You are great {User}`
- **Night (from 9 PM to 6 AM)** :zzz:
    - `Have a good night, {User}`
    - `Wish you sweet dreams {User} ...`
    - `It was a great day! {User} it's time to relax!`

## Feature Five

_Greeting a User with an inspirational quote to brighten their day_

```
When a User with the name Joe requests a greeting message
Then the system will reply with a customized message that includes an inspirational quote:
"Hello Joe! Here's something to inspire your day: 'The only way to do great work is to love what you do.'"
```

## Feature Six

_Greeting a User with time-based messages enhanced with inspirational quotes_

**Requesting a greeting message early in the morning with inspirational quote**

```
When a User with the name Joe requests a greeting message
And the time is early in the morning
And an inspirational quote is available
Then the system will reply with a customized message that says:
"Good morning, Joe! The sun is high and shining! Here's something to inspire your day: 'Success is not final, failure is not fatal: it is the courage to continue that counts.'"
```

**Requesting a greeting message in the evening with inspirational quote**

```
When a User with the name Joe requests a greeting message
And the time is in the evening
And an inspirational quote is available
Then the system will reply with a customized message that says:
"Have a good night, Joe. Here's a thought for tomorrow: 'The future belongs to those who believe in the beauty of their dreams.'"
```

**List of quote-enhanced messages based on the time**

- **Morning (from 7 AM to 11 AM)** :sunny:
    - `Good morning, {User}! The sun is high and shining! Here's something to inspire your day: "{quote}"`
    - `Hey {User}, nice to see you here! Today's inspiration: "{quote}"`
    - `{User} welcome back! Let this motivate you: "{quote}"`
    - `Have a splendid day {User}. Remember: "{quote}"`
- **The rest of the day (from 12 PM to 8 PM)** :clock3:
    - `Hello {User}! Here's something to brighten your afternoon: "{quote}"`
    - `You are great {User}! Here's a reminder: "{quote}"`
- **Night (from 9 PM to 6 AM)** :zzz:
    - `Have a good night, {User}. Here's a thought for tomorrow: "{quote}"`
    - `Wish you sweet dreams {User}. Sleep well with this wisdom: "{quote}"`
    - `It was a great day! {User}, end it with this inspiration: "{quote}"`



## Feature Seven

Fallback greeting when inspirational quote service is unavailable
When a User with the name Joe requests a greeting message with quote
And the inspirational quote service is unavailable
Then the system will reply with a customized fallback message that says:
"Good morning, Joe! The sun is high and shining! Make today amazing!"
List of fallback inspirational messages when quote API fails

Make today amazing!
Have a wonderful day!
Wishing you success today!
Today is full of possibilities!
You've got this!
Believe in yourself today!


## Feature Eight

_Saving and retrieving user greeting preferences_

```
When a User with the name Joe sets their preferred greeting style to "formal"
And saves their preference in the system
Then the system will store this preference in the database
And future greeting requests will use the formal style
```

## Feature Nine

_Personalizing greetings based on saved user preferences_

**User with saved casual greeting preference**

```
When a User with the name Joe requests a greeting message
And Joe has previously saved a preference for "casual" greetings
And the time is early in the morning
Then the system will reply with a casual morning message:
"Hey Joe! Hope you're having an awesome morning!"
```

**User with saved formal greeting preference**

```
When a User with the name Joe requests a greeting message  
And Joe has previously saved a preference for "formal" greetings
And the time is early in the morning
Then the system will reply with a formal morning message:
"Good morning, Mr. Joe. I trust you are having a pleasant start to your day."
```

## Feature Ten

_Tracking and displaying user greeting history_

```
When a User with the name Joe requests their greeting history
Then the system will retrieve and display their last 10 greetings from the database
Including the timestamp, greeting message, and greeting type used
```

## Feature Eleven

_Saving user's favorite inspirational quotes_

```
When a User with the name Joe receives a greeting with an inspirational quote
And Joe marks the quote as "favorite"
Then the system will save this quote to Joe's personal favorites in the database
And the quote can be retrieved for future personalized greetings
```

## **Database Schema Requirements**

**Users Table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    preferred_greeting_style ENUM('casual', 'formal', 'funny') DEFAULT 'casual',
    preferred_time_format ENUM('12hour', '24hour') DEFAULT '12hour',
    include_quotes BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Greeting History Table:**
```sql
CREATE TABLE greeting_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    greeting_message TEXT NOT NULL,
    greeting_type ENUM('basic', 'time_based', 'quote_enhanced') NOT NULL,
    time_of_day ENUM('morning', 'afternoon', 'evening', 'night'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**User Favorite Quotes Table:**
```sql
CREATE TABLE user_favorite_quotes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    quote_content TEXT NOT NULL,
    quote_author VARCHAR(255),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## **API Endpoints for Database Features**

**User Preferences Management:**
```
POST   /api/users                     # Create new user
GET    /api/users/{id}/preferences    # Get user preferences  
PUT    /api/users/{id}/preferences    # Update user preferences
DELETE /api/users/{id}               # Delete user account
```

**Greeting History:**
```
GET    /api/users/{id}/greeting-history        # Get user's greeting history
POST   /api/users/{id}/greeting-history        # Save new greeting to history
GET    /api/users/{id}/greeting-history/stats  # Get usage statistics
```

**Favorite Quotes:**
```
GET    /api/users/{id}/favorite-quotes    # Get user's favorite quotes
POST   /api/users/{id}/favorite-quotes    # Add quote to favorites
DELETE /api/users/{id}/favorite-quotes/{quote_id}  # Remove from favorites
```

**Enhanced Greeting with Database:**
```
GET    /api/greeting/{user_id}                    # Personalized greeting using saved preferences
GET    /api/greeting/{user_id}/with-favorite-quote # Use user's favorite quotes
```

## **Greeting Style Examples Based on Saved Preferences**

**Casual Style:**
- `Hey {User}!`
- `What's up {User}!`
- `{User}, hope you're doing great!`

**Formal Style:**
- `Good [time], {Title} {User}.`
- `I trust you are having a pleasant {time}, {User}.`
- `{User}, I hope this message finds you well.`

**Funny Style:**
- `{User}! Ready to conquer the world today?`
- `Alert! {User} has entered the chat!`
- `{User}, may your coffee be strong and your Monday be short!`

This feature demonstrates full CRUD operations while providing genuine value to users by personalizing their experience and maintaining their interaction history!
