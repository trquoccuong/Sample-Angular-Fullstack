### Prerequisites
- Nodejs 7.10.0 :
```
  brew install node
```
- Postgres
```
  brew install postgres
```

### Config database:

- Go to './server/config/environment/development'
- Update postgres connect string
```
    uri: 'postgres://<username>:<password>@<host>:5432/<dbname>',

```
### Start app:

- Install dependencies:
```
  npm install
```
- Start app:

```
  npm start
```

- App run on port 3000

### Instruction:

- App will create some sample data inside './server/config/seed.js'

- Default admin account

```
  username: admin@example.com
  password: admin
```
- Default user

```
  username: test@example.com
  password: test
```
