import conn from './conn.js'

export async function registerUser(username, password_md5, email) {
  const sql = `INSERT INTO users (username, password_md5, email) VALUES ($1,MD5($2),$3)`
  await conn.query(sql, [username, password_md5, email])
  return true
}

export async function loginUser(username, password_md5) {
  const sql = `SELECT * FROM users WHERE username = $1 AND password_md5 = MD5($2)`
  const result = await conn.query(sql, [username, password_md5])
  return result.rows[0]
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id = $1`
  const result = await conn.query(sql, [id])
  return result.rows[0].length > 0 ? result.rows : 'No user found.'
}

export async function getPosts() {
  const result = await conn.query(`SELECT * FROM blog_posts`)
  return result.rows.length > 0 ? result.rows : 'No posts found.'
}

export async function getPostByID(id) {
  const sql = `SELECT * FROM blog_posts WHERE id = $1`
  const result = await conn.query(sql, [id])
  return result.rows[0].length > 0 ? result.rows : 'No post found.'
}

export async function createPost(title, content, author_id, category, tags) {
  const sql = `INSERT INTO blog_posts (title, content, author_id, category, tags) VALUES ($1, $2, $3, $4, $5)`
  await conn.query(sql, [title, content, author_id, category, tags])
  return true
}
export async function updatePost(id, title, content, category, tags) {
  const sql = `UPDATE blog_posts SET title = $2, content = $3, category = $4, tags = $5, WHERE id = $1`
  await conn.query(sql, [id, title, content, author_id, category, tags])
  return true
}
