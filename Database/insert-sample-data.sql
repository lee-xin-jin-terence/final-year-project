
/*------------------APIARIST----------------------*/

INSERT INTO APIARIST (ApiaristId,  Password) VALUES ('user1',  
 '0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90');

INSERT INTO APIARIST (ApiaristId, Password) 
VALUES ('user2',  
'6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3');

INSERT INTO APIARIST (ApiaristId, Password)
 VALUES ('user3', 
 '5860faf02b6bc6222ba5aca523560f0e364ccd8b67bee486fe8bf7c01d492ccb' );

INSERT INTO APIARIST (ApiaristId, Password)
 VALUES ('user4',  
 '5269ef980de47819ba3d14340f4665262c41e933dc92c1a27dd5d01b047ac80e');

INSERT INTO APIARIST (ApiaristId, Password)
 VALUES ('user5', 
 '5a39bead318f306939acb1d016647be2e38c6501c58367fdb3e9f52542aa2442' );

INSERT INTO APIARIST (ApiaristId, Password)
 VALUES ('user6',
 'ecb48a1cc94f951252ec462fe9ecc55c3ef123fadfe935661396c26a45a5809d');



/*------------------HONEY_HIVE----------------------*/


INSERT INTO HONEY_HIVE (HoneyHiveId, Location , LastInspectionDate, 
NextInspectionDate) VALUES ('Hive-1', ST_GeomFromText('POINT(1.325720 103.964603)') , 
 STR_TO_DATE( '26/11/2021', '%d/%m/%Y' ), STR_TO_DATE( '26/12/2021', '%d/%m/%Y' ));

INSERT INTO HONEY_HIVE (HoneyHiveId, Location ,  LastInspectionDate, 
NextInspectionDate) VALUES ('Hive-2', ST_GeomFromText('POINT(1.325956 103.965451)') , 
 STR_TO_DATE( '22/11/2021', '%d/%m/%Y' ), STR_TO_DATE( '22/12/2021', '%d/%m/%Y' ));

INSERT INTO HONEY_HIVE (HoneyHiveId, Location ,  LastInspectionDate, 
NextInspectionDate) VALUES ('Hive-3', ST_GeomFromText('POINT(1.320997 103.967668)') , 
 STR_TO_DATE( '29/10/2021', '%d/%m/%Y' ), STR_TO_DATE( '29/11/2021', '%d/%m/%Y' ));

INSERT INTO HONEY_HIVE (HoneyHiveId, Location ,  LastInspectionDate, 
NextInspectionDate) VALUES ('Hive-4', ST_GeomFromText('POINT(1.321087 103.964240)'),
 STR_TO_DATE( '19/10/2021', '%d/%m/%Y' ), STR_TO_DATE( '19/11/2021', '%d/%m/%Y' ));

INSERT INTO HONEY_HIVE (HoneyHiveId, Location ,  LastInspectionDate, 
NextInspectionDate) VALUES ('Hive-5', ST_GeomFromText('POINT(1.325473 103.965719)') , 
STR_TO_DATE( '22/10/2021', '%d/%m/%Y' ), STR_TO_DATE( '22/11/2021', '%d/%m/%Y' ));

INSERT INTO HONEY_HIVE (HoneyHiveId, Location , LastInspectionDate, 
NextInspectionDate) VALUES ('Hive-6', ST_GeomFromText('POINT(1.325376 103.966309)') 
, STR_TO_DATE( '22/11/2021', '%d/%m/%Y' ), STR_TO_DATE( '22/12/2021', '%d/%m/%Y' ));


/*---------------TRANSACTION ---------------------*/

/*-----January Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Nucs' ,  100.50, 
STR_TO_DATE( '05/01/2021', '%d/%m/%Y' ), 'user1');


INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 80 Queen bees' ,  30.50, 
STR_TO_DATE( '06/01/2021', '%d/%m/%Y' ), 'user2');


INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 11 hars of honey' ,  100.50, 
STR_TO_DATE( '11/01/2021', '%d/%m/%Y' ), 'user3');



/*-----February Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 250 Nucs' ,  200.50, 
STR_TO_DATE( '05/02/2021', '%d/%m/%Y' ), 'user6');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 20 hive nets' ,  20.50, 
STR_TO_DATE( '15/02/2021', '%d/%m/%Y' ), 'user3');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 50 jars of honey' ,  400.20, 
STR_TO_DATE( '17/02/2021', '%d/%m/%Y' ), 'user5');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 50 Queen bees' ,  300.50, 
STR_TO_DATE( '19/02/2021', '%d/%m/%Y' ), 'user4');


/*-----March Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 40 few jars of honey' ,  150.50, 
STR_TO_DATE( '01/02/2021', '%d/%m/%Y' ), 'user3');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 10 hive stand' ,  27.50, 
STR_TO_DATE( '10/02/2021', '%d/%m/%Y' ), 'user4');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Nucs' ,  900.50, 
STR_TO_DATE( '13/02/2021', '%d/%m/%Y' ), 'user1');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Queen bees' ,  300.50, 
STR_TO_DATE( '15/02/2021', '%d/%m/%Y' ), 'user4');



/*-----April Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 100 jars to store honey' ,  100.00, 
STR_TO_DATE( '07/04/2021', '%d/%m/%Y' ), 'user4');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 200 high quality beekeeping gloves' ,  300, 
STR_TO_DATE( '22/04/2021', '%d/%m/%Y' ), 'user5');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 72 queen bees' ,  60.50, 
STR_TO_DATE( '23/11/2021', '%d/%m/%Y' ), 'user6');


/*-----May Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 7 queen excluders' ,  17.50, 
STR_TO_DATE( '25/05/2021', '%d/%m/%Y' ), 'user6');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 100 hive nets' ,  48.50, 
STR_TO_DATE( '30/05/2021', '%d/%m/%Y' ), 'user4');


INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 7 hive nets' ,  100.50, 
STR_TO_DATE( '30/05/2021', '%d/%m/%Y' ), 'user1');




/*-----June Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 100 brood chambers' ,  17.50, 
STR_TO_DATE( '01/06/2021', '%d/%m/%Y' ), 'user1');


INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 10 Nucs' ,  22.50, 
STR_TO_DATE( '03/06/2021', '%d/%m/%Y' ), 'user3');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 28 Nucs' ,  150.50, 
STR_TO_DATE( '11/06/2021', '%d/%m/%Y' ), 'user5');


/*-----July Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 120 Nucs' ,  170.50, 
STR_TO_DATE( '05/07/2021', '%d/%m/%Y' ), 'user1');


INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 80 Queen bees' ,  20.50, 
STR_TO_DATE( '06/07/2021', '%d/%m/%Y' ), 'user2');


INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 11 hars of honey' ,  11.50, 
STR_TO_DATE( '11/07/2021', '%d/%m/%Y' ), 'user3');


/*-----August Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 95 jars of honey' ,  150.50, 
STR_TO_DATE( '01/08/2021', '%d/%m/%Y' ), 'user6');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought High Quality Beekeeping gloves' ,  80.50, 
STR_TO_DATE( '11/08/2021', '%d/%m/%Y' ), 'user2');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Nucs' ,  60.50, 
STR_TO_DATE( '23/08/2021', '%d/%m/%Y' ), 'user6');


/*-----September Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 30 jars of honey' ,  20.50, 
STR_TO_DATE( '23/09/2021', '%d/%m/%Y' ), 'user6');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Queen bees' ,  300.50, 
STR_TO_DATE( '24/09/2021', '%d/%m/%Y' ), 'user4');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Nucs' ,  60.50, 
STR_TO_DATE( '25/09/2021', '%d/%m/%Y' ), 'user6');


/*-----October Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 30 hive stands' ,  40.50, 
STR_TO_DATE( '14/10/2021', '%d/%m/%Y' ), 'user6');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 40 Hive stands' ,  100.70, 
STR_TO_DATE( '18/10/2021', '%d/%m/%Y' ), 'user4');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 100 Nucs' ,  60.50, 
STR_TO_DATE( '22/10/2021', '%d/%m/%Y' ), 'user6');

/*-----November Transactions------*/

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 20 jars of honey' ,  15.50, 
STR_TO_DATE( '14/11/2021', '%d/%m/%Y' ), 'user6');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('PURCHASE', 'Bought 20 Nucs' ,  50.70, 
STR_TO_DATE( '18/11/2021', '%d/%m/%Y' ), 'user4');

INSERT INTO TRANSACTION (TransactionType, Description, TotalAmount, Date, ApiaristId ) 
VALUES ('SALES', 'Sold 60 Nucs' ,  70.50, 
STR_TO_DATE( '22/11/2021', '%d/%m/%Y' ), 'user6');




/*--------------------HIVE_EVENT-------------------*/


/*--------HIVE_EVENT for Hive-1--------*/

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('QUEENING', 'Introduced a new queen to the hive' , 
STR_TO_DATE( '01/01/2021', '%d/%m/%Y' ), 'Sunny', 'user1', 'Hive-1');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SWARMING', 'The hive just created 2 more colonies' , 
STR_TO_DATE( '03/04/2021', '%d/%m/%Y' ), 'Cloudy', 'user3', 'Hive-1');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('CLEANING', 'Just cleaned the hive with vacuum cleaner' , 
STR_TO_DATE( '22/08/2021', '%d/%m/%Y' ), 'Raining', 'user5', 'Hive-1');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('MATING', 'The queen bee just mated with a drone' , 
STR_TO_DATE( '15/10/2021', '%d/%m/%Y' ), 'Thunderstorm', 'user6', 'Hive-1');


/*--------HIVE_EVENT for Hive-2--------*/

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('CLEANING', 'Cleaned the hive surroundings with detergent' , 
STR_TO_DATE( '01/02/2021', '%d/%m/%Y' ), 'Sunny', 'user1', 'Hive-2');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SPLITTING', 'The hive splitted into two small hives' , 
STR_TO_DATE( '03/05/2021', '%d/%m/%Y' ), 'Cloudy', 'user1', 'Hive-2');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('QUEENING', 'Added a new queen bee to the hive' , 
STR_TO_DATE( '22/07/2021', '%d/%m/%Y' ), 'Raining', 'user2', 'Hive-2');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('MATING', 'The queen bee just mated with a drone' , 
STR_TO_DATE( '15/11/2021', '%d/%m/%Y' ), 'Thunderstorm', 'user3', 'Hive-2');



/*--------HIVE_EVENT for Hive-3--------*/

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('MATING', 'The queen bee just mated with a drone' , 
STR_TO_DATE( '01/03/2021', '%d/%m/%Y' ), 'Cloudy', 'user3', 'Hive-3');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SPLITTING', 'The hive splitted into two small hives' , 
STR_TO_DATE( '03/06/2021', '%d/%m/%Y' ), 'Cloudy', 'user2', 'Hive-3');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('CLEANING', 'Cleaned the hive area with some disinfectant' , 
STR_TO_DATE( '22/08/2021', '%d/%m/%Y' ), 'Thunderstorm', 'user2', 'Hive-3');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('MATING', 'The queen bee just mated with a drone' , 
STR_TO_DATE( '15/10/2021', '%d/%m/%Y' ), 'Raining', 'user6', 'Hive-3');




/*--------HIVE_EVENT for Hive-4--------*/

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('CLEANING', 'Cleaned the hive area with some disinfectant' , 
STR_TO_DATE( '01/02/2021', '%d/%m/%Y' ), 'Sunny', 'user6', 'Hive-4');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SPLITTING', 'The hive splitted into two small hives' , 
STR_TO_DATE( '22/04/2021', '%d/%m/%Y' ), 'Sunny', 'user6', 'Hive-4');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('QUEENING', 'Added a queen to the hive' , 
STR_TO_DATE( '17/07/2021', '%d/%m/%Y' ), 'Cloudy', 'user3', 'Hive-4');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SWARMING', 'The hive swarmed into 3 separate hives' , 
STR_TO_DATE( '01/11/2021', '%d/%m/%Y' ), 'Thunderstorm', 'user3', 'Hive-4');



/*--------HIVE_EVENT for Hive-5--------*/

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('MATING', 'The queen bee just mated with a drone' , 
STR_TO_DATE( '11/03/2021', '%d/%m/%Y' ), 'Sunny', 'user6', 'Hive-5');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SPLITTING', 'The hive splitted into two small hives' , 
STR_TO_DATE( '19/05/2021', '%d/%m/%Y' ), 'Sunny', 'user6', 'Hive-5');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('QUEENING', 'Added a queen to the hive' , 
STR_TO_DATE( '19/08/2021', '%d/%m/%Y' ), 'Cloudy', 'user3', 'Hive-5');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('CLEANING', 'Cleaned the hive area with some disinfectant' , 
STR_TO_DATE( '27/10/2021', '%d/%m/%Y' ), 'Thunderstorm', 'user3', 'Hive-5');



/*--------HIVE_EVENT for Hive-6--------*/

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SPLITTING', 'The hive splitted into two large hives' , 
STR_TO_DATE( '23/01/2021', '%d/%m/%Y' ), 'Sunny', 'user6', 'Hive-6');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('SPLITTING', 'The hive splitted into two small hives' , 
STR_TO_DATE( '11/04/2021', '%d/%m/%Y' ), 'Sunny', 'user6', 'Hive-6');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('QUEENING', 'Added a queen to the hive' , 
STR_TO_DATE( '24/09/2021', '%d/%m/%Y' ), 'Cloudy', 'user3', 'Hive-6');

INSERT INTO HIVE_EVENT (EventType, Description, Date, WeatherCondition ,
ApiaristId, HoneyHiveId) VALUES ('CLEANING', 'Cleaned the hive area with some disinfectant' , 
STR_TO_DATE( '17/11/2021', '%d/%m/%Y' ), 'Thunderstorm', 'user3', 'Hive-6');




/*--------------------COMPLETED_INSPECTION-------------------*/


/*--------------------COMPLETED_INSPECTION FOR HIVE-1  -------------------*/

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user1' , STR_TO_DATE( '27/01/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/01/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user3' , STR_TO_DATE( '26/02/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '24/02/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is a little dirty and dusty. Needs to be cleaned', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user2' , STR_TO_DATE( '24/03/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/03/2021', '%d/%m/%Y' ), 'FAIL' , 'Hive is very crowded. Needs to split the hive', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user4' , STR_TO_DATE( '23/04/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '28/04/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user1' , STR_TO_DATE( '28/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user6' , STR_TO_DATE( '28/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user1' , STR_TO_DATE( '26/06/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/06/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user4' , STR_TO_DATE( '26/07/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '29/07/2021', '%d/%m/%Y' ), 'FAIL' , 'The queen bee is found dead', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user1' , STR_TO_DATE( '29/08/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '24/08/2021', '%d/%m/%Y' ), 'FAIL' , 'The hive is a little too wet.', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user2' , STR_TO_DATE( '24/09/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/09/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user2' , STR_TO_DATE( '25/10/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '24/10/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-1', 'user2' , STR_TO_DATE( '24/11/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/11/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Thunderstorm');


/*--------------------COMPLETED_INSPECTION FOR HIVE-2  -------------------*/

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user3' , STR_TO_DATE( '29/01/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/01/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user1' , STR_TO_DATE( '26/02/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '27/02/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is a little dirty and dusty. Needs to be cleaned', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user4' , STR_TO_DATE( '27/03/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/03/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is slightly crowded. Still acceptable', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user1' , STR_TO_DATE( '25/04/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '28/04/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user5' , STR_TO_DATE( '28/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user6' , STR_TO_DATE( '28/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/05/2021', '%d/%m/%Y' ), 'FAIL' , 'Many bees are found dead', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user6' , STR_TO_DATE( '21/06/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/06/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user4' , STR_TO_DATE( '23/07/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/07/2021', '%d/%m/%Y' ), 'FAIL' , 'The queen bee is very agitated', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user5' , STR_TO_DATE( '25/08/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/08/2021', '%d/%m/%Y' ), 'PASS' , 'The hive is in good condition.', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user1' , STR_TO_DATE( '22/09/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/09/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user2' , STR_TO_DATE( '25/10/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '26/10/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-2', 'user4' , STR_TO_DATE( '26/11/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/11/2021', '%d/%m/%Y' ), 'FAIL' , 'Hive is a little dirty', 'Raining');



/*--------------------COMPLETED_INSPECTION FOR HIVE-3 -------------------*/

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user1' , STR_TO_DATE( '21/01/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/01/2021', '%d/%m/%Y' ), 'FAIL' , 'Hive is very dirty', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user2' , STR_TO_DATE( '22/02/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/02/2021', '%d/%m/%Y' ), 'FAIL' , 'Hive is a very dirty and dusty.', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user4' , STR_TO_DATE( '19/03/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/03/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is slightly crowded. Still acceptable', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user5' , STR_TO_DATE( '23/04/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/04/2021', '%d/%m/%Y' ), 'FAIL' , 'Some bees are found dead', 'Thunderstorm');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user1' , STR_TO_DATE( '21/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '24/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user3' , STR_TO_DATE( '24/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user2' , STR_TO_DATE( '21/06/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/06/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user4' , STR_TO_DATE( '21/07/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/07/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user2' , STR_TO_DATE( '23/08/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '20/08/2021', '%d/%m/%Y' ), 'FAIL' , 'The hive is very moist and wet.', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user5' , STR_TO_DATE( '20/09/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/09/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-3', 'user1' , STR_TO_DATE( '21/10/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '29/10/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Sunny');



/*--------------------COMPLETED_INSPECTION FOR HIVE-4 -------------------*/


INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user3' , STR_TO_DATE( '22/01/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/01/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user3' , STR_TO_DATE( '22/02/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/02/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user2' , STR_TO_DATE( '23/03/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/03/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is slightly crowded. Still acceptable', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user2' , STR_TO_DATE( '25/04/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/04/2021', '%d/%m/%Y' ), 'FAIL' , 'Queen bee is very agitated', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user1' , STR_TO_DATE( '22/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '24/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user5' , STR_TO_DATE( '20/06/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '18/06/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user6' , STR_TO_DATE( '18/07/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/07/2021', '%d/%m/%Y' ), 'FAIL' , 'The hive is very moist and wet.', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user2' , STR_TO_DATE( '19/08/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/08/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user4' , STR_TO_DATE( '22/09/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/09/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-4', 'user3' , STR_TO_DATE( '19/10/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/10/2021', '%d/%m/%Y' ), 'FAIL' , 'Some bees are found dead', 'Raining');



/*--------------------COMPLETED_INSPECTION FOR HIVE-5 -------------------*/

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user1' , STR_TO_DATE( '27/01/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/01/2021', '%d/%m/%Y' ), 'FAIL' , 'Many bees are found dead', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user2' , STR_TO_DATE( '21/02/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/02/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user3' , STR_TO_DATE( '23/03/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/03/2021', '%d/%m/%Y' ), 'FAIL' , 'Many bees are found dead', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user4' , STR_TO_DATE( '23/04/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/04/2021', '%d/%m/%Y' ), 'FAIL' , 'Queen bee is very agitated', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user5' , STR_TO_DATE( '25/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/05/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user5' , STR_TO_DATE( '21/06/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '18/06/2021', '%d/%m/%Y' ), 'FAIL' , 'Fire ants are invading the hive', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user3' , STR_TO_DATE( '18/07/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '17/07/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user2' , STR_TO_DATE( '17/08/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/08/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user4' , STR_TO_DATE( '21/09/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/09/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-5', 'user1' , STR_TO_DATE( '23/10/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/10/2021', '%d/%m/%Y' ), 'FAIL' , 'Some bees are found dead', 'Sunny');




/*--------------------COMPLETED_INSPECTION FOR HIVE-6 -------------------*/

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user3' , STR_TO_DATE( '24/01/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/01/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user3' , STR_TO_DATE( '24/02/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '21/02/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user1' , STR_TO_DATE( '21/03/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '23/03/2021', '%d/%m/%Y' ), 'FAIL' , 'Many bees are found dead', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user4' , STR_TO_DATE( '23/04/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/04/2021', '%d/%m/%Y' ), 'FAIL' , 'Queen bee is very agitated', 'Heavy Rain');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user6' , STR_TO_DATE( '19/05/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '24/05/2021', '%d/%m/%Y' ), 'FAIL' , 'Queen bee is found dead', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user2' , STR_TO_DATE( '24/06/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/06/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user1' , STR_TO_DATE( '19/07/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/07/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition.', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user3' , STR_TO_DATE( '22/08/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/08/2021', '%d/%m/%Y' ), 'FAIL' , 'Hive is invaded by fire ants', 'Raining');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user3' , STR_TO_DATE( '19/09/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '25/09/2021', '%d/%m/%Y' ), 'FAIL' , 'Hald the bees are dead', 'Sunny');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user4' , STR_TO_DATE( '25/10/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '19/10/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Cloudy');

INSERT INTO COMPLETED_INSPECTION (HoneyHiveId, ApiaristId, InspectionDueDate ,
InspectionActualDate, Outcome , Description, WeatherCondition) VALUES 
('Hive-6', 'user4' , STR_TO_DATE( '19/11/2021', '%d/%m/%Y' ), 
STR_TO_DATE( '22/11/2021', '%d/%m/%Y' ), 'PASS' , 'Hive is in good condition', 'Sunny');




/*-------------------HONEY_HARVEST_BATCH--------------------------*/


INSERT INTO HONEY_HARVEST_BATCH (VolumeHarvested,
Date, ApiaristId, HoneyHiveId) VALUES(
10.5, STR_TO_DATE( '14/11/21', '%d/%m/%Y' ), 'user1', 'Hive-1');

INSERT INTO HONEY_HARVEST_BATCH (VolumeHarvested,
Date, ApiaristId, HoneyHiveId) VALUES(
15.5, STR_TO_DATE( '15/11/21', '%d/%m/%Y' ), 'user1', 'Hive-2');

INSERT INTO HONEY_HARVEST_BATCH (VolumeHarvested,
Date, ApiaristId, HoneyHiveId) VALUES(
11.5, STR_TO_DATE( '16/11/21', '%d/%m/%Y' ), 'user1', 'Hive-3');

INSERT INTO HONEY_HARVEST_BATCH ( VolumeHarvested,
Date, ApiaristId, HoneyHiveId) VALUES(
9.5, STR_TO_DATE( '17/11/21', '%d/%m/%Y' ), 'user1', 'Hive-4');

INSERT INTO HONEY_HARVEST_BATCH (VolumeHarvested,
Date, ApiaristId, HoneyHiveId) VALUES(
12.5, STR_TO_DATE( '17/11/21', '%d/%m/%Y' ), 'user1', 'Hive-5');

INSERT INTO HONEY_HARVEST_BATCH ( VolumeHarvested,
Date, ApiaristId, HoneyHiveId) VALUES(
13.0, STR_TO_DATE( '18/11/21', '%d/%m/%Y' ), 'user1', 'Hive-6');

/*-----------------------------------------------------------*/

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(1, 'Rose');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(1, 'Sunflower');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(1, 'Lily');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(2, 'Sunflower');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(2, 'Daisy');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(2, 'Tulip');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(2, 'Orchid');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(3, 'Sunflower');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(3, 'Daisy');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(3, 'Tulip');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(4, 'Carnation');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(4, 'Freesia');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(4, 'Hyacinth');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(5, 'Sunflower');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(5, 'Daisy');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(5, 'Tulip');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(6, 'Peruvian Lily');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(6, 'Chrysanthemum');

INSERT INTO HONEY_FLOWER (BatchId, FlowerName) 
VALUES(6, 'Gladiolus');
