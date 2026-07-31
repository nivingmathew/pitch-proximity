CREATE TABLE football_events (
    id SERIAL PRIMARY KEY,
    event_description VARCHAR(255) NOT NULL,
    event_year INT NOT NULL
);

INSERT INTO football_events (event_description, event_year) VALUES
('The Premier League officially plays its inaugural season', 1992),
('Manchester United completes the historic Treble (PL, FA Cup, UCL)', 1999),
('Ronaldo scores twice in the final as Brazil wins the World Cup', 2002),
('Cristiano Ronaldo signs for Manchester United from Sporting CP', 2003),
('Arsenal completes the Invincibles season undefeated in the Premier League', 2004),
('Liverpool wins the Miracle of Istanbul Champions League final', 2005),
('Zinedine Zidane headbutts Marco Materazzi in the World Cup Final', 2006),
('Pep Guardiola''s Barcelona wins the unprecedented Sextuple', 2009),
('Andres Iniesta scores the extra-time winner for Spain in the World Cup', 2010),
('Sergio Aguero scores the 94th-minute goal to win Man City the league', 2012),
('Germany destroys Brazil 7-1 in the World Cup Semi-Final', 2014),
('Leicester City completes the greatest underdog story by winning the Premier League', 2016),
('Neymar shatters the transfer record by joining PSG for €222 million', 2017),
('Real Madrid wins their third consecutive Champions League title', 2018),
('Liverpool completes the 4-0 comeback against Barcelona (Corner taken quickly)', 2019),
('Bayern Munich annihilates Barcelona 8-2 in the Champions League', 2020),
('Lionel Messi tearfully leaves Barcelona to join PSG', 2021),
('Lionel Messi and Argentina win the FIFA World Cup in Qatar', 2022),
('Manchester City wins the Treble under Pep Guardiola', 2023),
('Bayer Leverkusen wins the Bundesliga completely undefeated', 2024);