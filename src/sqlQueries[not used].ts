//these queries are no longer important as we are now making use of an ORM and not raw queries
const CreateUsersTable = `
CREATE TABLE IF NOT EXISTS "Users"(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name TEXT DEFAULT NULL,
    last_name TEXT DEFAULT NULL,
    password VARCHAR(250) NOT NULL,
    phoneNumber TEXT DEFAULT NULL,
    address TEXT DEFAULT NULL,
    is_admin BOOL DEFAULT 't'
)
`;
const CreatePropertiesTable = `
CREATE TABLE IF NOT EXISTS "Property"(
    id SERIAL NOT NULL PRIMARY KEY,
    owner SERIAL NOT NULL,
    status TEXT DEFAULT 'available',
    price NUMERIC DEFAULT NULL,
    state TEXT DEFAULT NULL,
    city TEXT DEFAULT NULL,
    address TEXT DEFAULT NULL,
    type TEXT DEFAULT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    image_url TEXT DEFAULT NULL,
    FOREIGN KEY ("owner") REFERENCES "Users"("id")
)
`;
const CreateFlagsTable = `
CREATE TABLE IF NOT EXISTS "Flags"(
    id SERIAL NOT NULL PRIMARY KEY,
    reason TEXT[]
    description TEXT DEFAULT NULL
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    property_id SERIAL FOREIGN KEY REFERENCES "Property"(id),
    
)
`;

const getUser = `SELECT * FROM "Users" WHERE email = $1`;
const createNewUser = `INSERT INTO "Users" (email,password,first_name,last_name,phoneNumber,address,is_admin) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
const createProperty = `INSERT INTO "Property" (owner,price,state,city,address,type,image_url,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
const getProperty = `SELECT * FROM "Property" WHERE id=$1`;
const updateProperty = `UPDATE "Property" SET price=$1,state=$2,city=$3,address=$4,type=$5,image_url=$6,status=$7 WHERE id=$8 RETURNING *`;
const updatePropertyStatus = `UPDATE "Property" SET status=$1 WHERE id=$2 RETURNING *`;
const getAllPropertiesByTypeWithUserDetails = `SELECT "Property".*, "Users".email, "Users".phoneNumber FROM "Property" JOIN "Users" ON "Users".id = "Property".owner WHERE type=$1`;
const getAllPropertiesWithUserDetails = `SELECT "Property".*, "Users".email, "Users".phoneNumber FROM "Property" JOIN "Users" ON "Users".id = "Property".owner `;
const deleteProperty = `DELETE FROM "Property" WHERE id=$1`;

export {
  CreateUsersTable,
  CreatePropertiesTable,
  CreateFlagsTable,
  getUser,
  createNewUser,
  createProperty,
  getProperty,
  updateProperty,
  updatePropertyStatus,
  getAllPropertiesByTypeWithUserDetails,
  getAllPropertiesWithUserDetails,
  deleteProperty,
};
