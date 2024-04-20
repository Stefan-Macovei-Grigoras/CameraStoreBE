USE [MPP_DB]
GO
DROP TABLE IF EXISTS Review
DROP TABLE IF EXISTS Camera


CREATE TABLE Camera(
	cameraId UNIQUEIDENTIFIER PRIMARY KEY,
	cameraName VARCHAR(50),
	cameraPrice INT,
	cameraDescription VARCHAR(100)
)

 CREATE TABLE Review(
	reviewId UNIQUEIDENTIFIER PRIMARY KEY,
	cameraId UNIQUEIDENTIFIER REFERENCES Camera(cameraId),
	reviewText VARCHAR(100)
 )

INSERT INTO Camera (cameraId, cameraName, cameraPrice, cameraDescription) 
VALUES
('550e8400-e29b-41d4-a716-446655440000', 'c1', 1, 't1');
SELECT* FROM Camera