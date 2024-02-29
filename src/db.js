const initDb = (connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS backend;`, (err, result) => {
        if (err) throw err;
        console.log("Database 'backend' created or already exists.");

        connection.query(`USE backend;`, (err, result) => {
            if (err) throw err;

            const createTableSql = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(255)
                );
            `;
            connection.query(createTableSql, (err, result) => {
                if (err) throw err;
                console.log("Table 'users' created or already exists.");

                // INSERT sample record into 'users' table
                const insertSql = `
                    INSERT INTO users (username, password, email) VALUES
                    ('sampleUser', 'samplePassword', 'sample@example.com'),
                    ('anotherUser', 'anotherPassword', 'another@example.com');
                `;
                // Check if the 'users' table is empty before inserting
                connection.query('SELECT * FROM users', (err, results) => {
                    if (err) throw err;
                    // If the table is empty, insert the sample records
                    if (results.length === 0) {
                        connection.query(insertSql, (err, result) => {
                            if (err) throw err;
                            console.log("Sample users inserted.");
                        });
                    } else {
                        console.log("Users table is not empty, skipping sample inserts.");
                    }
                });
            });
        });
    });
};

module.exports = { initDb };