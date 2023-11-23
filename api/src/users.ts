import sql from "./db";

export async function getUser(username: string, password: string) {
    const userExist = await sql`
  select
      password
      from users
      where username = ${username}
  `;
    if (userExist.length > 0 && password.length >= 8) {
        const isMatch = await Bun.password.verify(
            password,
            userExist[0].password
        );
        if (isMatch) {
            const users = await sql`
    select
        uuid,
        username
        from users
        where username = ${username} AND password = ${userExist[0].password} 
    `;

            if (users.length === 0) return { error: "user does not exist" };
            else {
                console.log(`user connected: ${username}`);
                return { username: users[0].username, uuid: users[0].uuid };
            }
        } else {
            return { error: "wrong credentials" };
        }
    } else {
        return { error: "wrong credentials" };
    }
}

export async function createUser(
    username: string,
    email: string,
    password: string
) {
    // username bigger or equal than 3 characters and only (lowercase, numbers, underscore)
    const usernameValidation = /^[a-z0-9_]{3,}$/i;
    // Match uppercase, lowercase, digit or #$!%*?& and make sure the length is 8 to 96 in length
    const passwordValidation =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d.@#$!%*?&])[a-zA-Z\d.@#$!%*?&]{8,96}$/;

    const userUUID = crypto.randomUUID();
    const time = new Date(Date.now());

    const checkUsername = await sql`
  SELECT id FROM users WHERE username=${username}
`;

    // check if username already exist
    if (checkUsername.length > 0) {
        return { error: "username already exist" };
    }

    // check username syntax
    if (!usernameValidation.test(username)) {
        return { error: "invalid username syntax" };
    }

    // check password syntax
    if (!passwordValidation.test(password)) {
        return { error: "invalid password syntax" };
    }

    // use bcrypt
    const bcryptHash = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4, // number between 4-31
    });

    // create user request
    const users = await sql`
  INSERT INTO users (uuid, username, password, email, accountcreation)
  VALUES (${userUUID}, ${username}, ${bcryptHash}, ${email}, ${time.toUTCString()});
`;
    console.log(users);
    return { uuid: userUUID, username };
}

export async function checkUserData(username: string, uuid: string) {
    const users = await sql`
    select
      uuid,
      username
    from users
    where username = ${username} AND uuid = ${uuid} 
  `;
    if (users.length === 0) return { exist: false };
    else return { exist: true };
}
