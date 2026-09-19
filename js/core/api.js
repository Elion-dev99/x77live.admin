// /js/core/api.js

export async function apiGet(path) {
  // ★ API呼び出し前の抜け殻
  console.log(`GET: ${path}`);

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function apiPost(path, body) {
  // ★ API呼び出し前の抜け殻
  console.log(`POST: ${path}`, body);

  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
