USE friendFinder_db;

DROP TABLE people;

CREATE TABLE people(
    person_id INT AUTO_INCREMENT NOT NULL,
    person_name VARCHAR(50) NOT NULL,
    photoUrl VARCHAR(500) NOT NULL,
    scores VARCHAR(50) NOT NULL,
    PRIMARY KEY(person_id)
);
