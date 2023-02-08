/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validCert(str) {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
    str
  );
}

/**
 * 验证联系电话的格式
 * 包括手机、固定电话
 * @param {string} str
 * @returns
 */
export function validPhone(str) {
  return /(^1\d{10}$)|(^0\d{2,3}-?\d{7,8}$)|(^\d{7,8}$)/.test(str);
}
