import conn from './conn.js'

export async function registerUser(username, password_md5, email) {
  const sql = `INSERT INTO users (username, password, email) VALUES ($1,MD5($2),$3)`
  await conn.query(sql, [username, password_md5, email])
  return true
}

export async function loginUser(username, password_md5) {
  const sql = `SELECT * FROM users WHERE username = $1 AND password = MD5($2)`
  const [rows] = await conn.query(sql, [username, password_md5])
  return rows[0]
}
