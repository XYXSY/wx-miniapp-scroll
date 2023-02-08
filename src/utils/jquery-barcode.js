/*
 *  BarCode Coder Library (BCC Library)
 *  BCCL Version 2.0
 *
 *  Porting : jQuery barcode plugin
 *  Version : 2.2
 *
 *  Date  : 2019-02-21
 *  Author  : DEMONTE Jean-Baptiste <jbdemonte@gmail.com>
 *            HOUREZ Jonathan
 *
 *  Web site: http://barcode-coder.com/
 *  dual licence :  http://www.cecill.info/licences/Licence_CeCILL_V2-fr.html
 *                  http://www.gnu.org/licenses/gpl.html
 */
!(function (g) {
  var s = {
      barWidth: 1,
      barHeight: 50,
      moduleSize: 5,
      showHRI: !0,
      addQuietZone: !0,
      marginHRI: 5,
      bgColor: "#FFFFFF",
      color: "#000000",
      fontSize: 10,
      output: "css",
      posX: 0,
      posY: 0,
    },
    h = [
      "NNWWN",
      "WNNNW",
      "NWNNW",
      "WWNNN",
      "NNWNW",
      "WNWNN",
      "NWWNN",
      "NNNWW",
      "WNNWN",
      "NWNWN",
    ];
  function d(r, t, e) {
    var n,
      o,
      a,
      i,
      c,
      f = "";
    if (
      ((r = (function (r, t, e) {
        var n,
          o,
          a = !0,
          i = 0;
        if (t) {
          for (
            "int25" === e && r.length % 2 == 0 && (r = "0" + r),
              n = r.length - 1;
            -1 < n;
            n--
          ) {
            if (((o = R(r.charAt(n))), isNaN(o))) return "";
            (i += a ? 3 * o : o), (a = !a);
          }
          r += ((10 - (i % 10)) % 10).toString();
        } else r.length % 2 != 0 && (r = "0" + r);
        return r;
      })(r, t, e)),
      "int25" === e)
    ) {
      for (f += "1010", n = 0; n < r.length / 2; n++)
        for (a = r.charAt(2 * n), i = r.charAt(2 * n + 1), o = 0; o < 5; o++)
          (f += "1"),
            "W" === h[a].charAt(o) && (f += "1"),
            (f += "0"),
            "W" === h[i].charAt(o) && (f += "0");
      f += "1101";
    } else if ("std25" === e) {
      for (f += "11011010", n = 0; n < r.length; n++)
        for (c = r.charAt(n), o = 0; o < 5; o++)
          (f += "1"), "W" === h[c].charAt(o) && (f += "11"), (f += "0");
      f += "11010110";
    }
    return f;
  }
  var v = [
      ["0001101", "0100111", "1110010"],
      ["0011001", "0110011", "1100110"],
      ["0010011", "0011011", "1101100"],
      ["0111101", "0100001", "1000010"],
      ["0100011", "0011101", "1011100"],
      ["0110001", "0111001", "1001110"],
      ["0101111", "0000101", "1010000"],
      ["0111011", "0010001", "1000100"],
      ["0110111", "0001001", "1001000"],
      ["0001011", "0010111", "1110100"],
    ],
    A = [
      "000000",
      "001011",
      "001101",
      "001110",
      "010011",
      "011001",
      "011100",
      "010101",
      "010110",
      "011010",
    ],
    p = ["00", "01", "10", "11"],
    b = [
      "11000",
      "10100",
      "10010",
      "10001",
      "01100",
      "00110",
      "00011",
      "01010",
      "01001",
      "00101",
    ];
  function m(r, t) {
    var e,
      n,
      o,
      a,
      i,
      c,
      f,
      h,
      l,
      u,
      g = "ean8" === t ? 7 : 12,
      s = r;
    if (!(r = r.substring(0, g)).match(new RegExp("^[0-9]{" + g + "}$")))
      return "";
    if (((r = N(r, t)), (c = "101"), "ean8" === t)) {
      for (e = 0; e < 4; e++) c += v[R(r.charAt(e))][0];
      for (c += "01010", e = 4; e < 8; e++) c += v[R(r.charAt(e))][2];
    } else {
      for (f = A[R(r.charAt(0))], e = 1; e < 7; e++)
        c += v[R(r.charAt(e))][R(f.charAt(e - 1))];
      for (c += "01010", e = 7; e < 13; e++) c += v[R(r.charAt(e))][2];
    }
    if (((c += "101"), "ean13" === t))
      if (2 === (a = s.substring(13, s.length)).length)
        for (c += "0000000000", i = parseInt(a, 10) % 4, e = 0; e < 2; e++)
          (h = R(a.charAt(e))), (l = R(p[R(i)][e])), (c += v[h][l]);
      else if (5 === a.length) {
        for (c += "0000000000", u = !0, n = o = 0, e = 0; e < 5; e++)
          u ? (o += R(a.charAt(e))) : (n += R(a.charAt(e))), (u = !u);
        for (i = (9 * n + 3 * o) % 10, c += "1011", e = 0; e < 5; e++)
          (h = R(a.charAt(e))),
            (l = R(b[R(i)][e])),
            (c += v[h][l]),
            e < 4 && (c += "01");
      }
    return c;
  }
  function N(r, t) {
    var e,
      n = "ean13" === t ? 12 : 7,
      o = r.substring(13, r.length),
      a = 0,
      i = !0;
    for (e = (r = r.substring(0, n)).length - 1; -1 < e; e--)
      (a += (i ? 3 : 1) * R(r.charAt(e))), (i = !i);
    return r + ((10 - (a % 10)) % 10).toString() + (o ? " " + o : "");
  }
  var W = [
    "101011",
    "1101011",
    "1001011",
    "1100101",
    "1011011",
    "1101101",
    "1001101",
    "1010011",
    "1101001",
    "110101",
    "101101",
  ];
  var x = [
    "101001101101",
    "110100101011",
    "101100101011",
    "110110010101",
    "101001101011",
    "110100110101",
    "101100110101",
    "101001011011",
    "110100101101",
    "101100101101",
    "110101001011",
    "101101001011",
    "110110100101",
    "101011001011",
    "110101100101",
    "101101100101",
    "101010011011",
    "110101001101",
    "101101001101",
    "101011001101",
    "110101010011",
    "101101010011",
    "110110101001",
    "101011010011",
    "110101101001",
    "101101101001",
    "101010110011",
    "110101011001",
    "101101011001",
    "101011011001",
    "110010101011",
    "100110101011",
    "110011010101",
    "100101101011",
    "110010110101",
    "100110110101",
    "100101011011",
    "110010101101",
    "100110101101",
    "100100100101",
    "100100101001",
    "100101001001",
    "101001001001",
    "100101101101",
  ];
  var C = [
    "100010100",
    "101001000",
    "101000100",
    "101000010",
    "100101000",
    "100100100",
    "100100010",
    "101010000",
    "100010010",
    "100001010",
    "110101000",
    "110100100",
    "110100010",
    "110010100",
    "110010010",
    "110001010",
    "101101000",
    "101100100",
    "101100010",
    "100110100",
    "100011010",
    "101011000",
    "101001100",
    "101000110",
    "100101100",
    "100010110",
    "110110100",
    "110110010",
    "110101100",
    "110100110",
    "110010110",
    "110011010",
    "101101100",
    "101100110",
    "100110110",
    "100111010",
    "100101110",
    "111010100",
    "111010010",
    "111001010",
    "101101110",
    "101110110",
    "110101110",
    "100100110",
    "111011010",
    "111010110",
    "100110010",
    "101011110",
  ];
  var S = [
    "11011001100",
    "11001101100",
    "11001100110",
    "10010011000",
    "10010001100",
    "10001001100",
    "10011001000",
    "10011000100",
    "10001100100",
    "11001001000",
    "11001000100",
    "11000100100",
    "10110011100",
    "10011011100",
    "10011001110",
    "10111001100",
    "10011101100",
    "10011100110",
    "11001110010",
    "11001011100",
    "11001001110",
    "11011100100",
    "11001110100",
    "11101101110",
    "11101001100",
    "11100101100",
    "11100100110",
    "11101100100",
    "11100110100",
    "11100110010",
    "11011011000",
    "11011000110",
    "11000110110",
    "10100011000",
    "10001011000",
    "10001000110",
    "10110001000",
    "10001101000",
    "10001100010",
    "11010001000",
    "11000101000",
    "11000100010",
    "10110111000",
    "10110001110",
    "10001101110",
    "10111011000",
    "10111000110",
    "10001110110",
    "11101110110",
    "11010001110",
    "11000101110",
    "11011101000",
    "11011100010",
    "11011101110",
    "11101011000",
    "11101000110",
    "11100010110",
    "11101101000",
    "11101100010",
    "11100011010",
    "11101111010",
    "11001000010",
    "11110001010",
    "10100110000",
    "10100001100",
    "10010110000",
    "10010000110",
    "10000101100",
    "10000100110",
    "10110010000",
    "10110000100",
    "10011010000",
    "10011000010",
    "10000110100",
    "10000110010",
    "11000010010",
    "11001010000",
    "11110111010",
    "11000010100",
    "10001111010",
    "10100111100",
    "10010111100",
    "10010011110",
    "10111100100",
    "10011110100",
    "10011110010",
    "11110100100",
    "11110010100",
    "11110010010",
    "11011011110",
    "11011110110",
    "11110110110",
    "10101111000",
    "10100011110",
    "10001011110",
    "10111101000",
    "10111100010",
    "11110101000",
    "11110100010",
    "10111011110",
    "10111101110",
    "11101011110",
    "11110101110",
    "11010000100",
    "11010010000",
    "11010011100",
    "11000111010",
  ];
  var w = [
    "101010011",
    "101011001",
    "101001011",
    "110010101",
    "101101001",
    "110101001",
    "100101011",
    "100101101",
    "100110101",
    "110100101",
    "101001101",
    "101100101",
    "1101011011",
    "1101101011",
    "1101101101",
    "1011011011",
    "1011001001",
    "1010010011",
    "1001001011",
    "1010011001",
  ];
  var I = [
    "100100100100",
    "100100100110",
    "100100110100",
    "100100110110",
    "100110100100",
    "100110100110",
    "100110110100",
    "100110110110",
    "110100100100",
    "110100100110",
  ];
  function y(r, t) {
    return (
      "object" == typeof t
        ? ("mod10" === t.crc1 ? (r = e(r)) : "mod11" === t.crc1 && (r = n(r)),
          "mod10" === t.crc2 ? (r = e(r)) : "mod11" === t.crc2 && (r = n(r)))
        : "boolean" == typeof t && t && (r = e(r)),
      r
    );
  }
  function e(r) {
    var t,
      e,
      n = r.length % 2,
      o = 0,
      a = 0;
    for (t = 0; t < r.length; t++)
      n ? (o = 10 * o + R(r.charAt(t))) : (a += R(r.charAt(t))), (n = !n);
    for (e = (2 * o).toString(), t = 0; t < e.length; t++) a += R(e.charAt(t));
    return r + ((10 - (a % 10)) % 10).toString();
  }
  function n(r) {
    var t,
      e = 0,
      n = 2;
    for (t = r.length - 1; 0 <= t; t--)
      (e += n * R(r.charAt(t))), (n = 7 === n ? 2 : n + 1);
    return r + ((11 - (e % 11)) % 11).toString();
  }
  var H = (function () {
    var N = [
        10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 40, 44, 48, 52, 64, 72, 80,
        88, 96, 104, 120, 132, 144, 8, 8, 12, 12, 16, 16,
      ],
      W = [
        10, 12, 14, 16, 18, 20, 22, 24, 26, 32, 36, 40, 44, 48, 52, 64, 72, 80,
        88, 96, 104, 120, 132, 144, 18, 32, 26, 36, 36, 48,
      ],
      x = [
        3, 5, 8, 12, 18, 22, 30, 36, 44, 62, 86, 114, 144, 174, 204, 280, 368,
        456, 576, 696, 816, 1050, 1304, 1558, 5, 10, 16, 22, 32, 49,
      ],
      C = [
        5, 7, 10, 12, 14, 18, 20, 24, 28, 36, 42, 48, 56, 68, 84, 112, 144, 192,
        224, 272, 336, 408, 496, 620, 7, 11, 14, 18, 24, 28,
      ],
      S = [
        8, 10, 12, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 14, 16, 18,
        20, 22, 24, 18, 20, 22, 6, 6, 10, 10, 14, 14,
      ],
      w = [
        8, 10, 12, 14, 16, 18, 20, 22, 24, 14, 16, 18, 20, 22, 24, 14, 16, 18,
        20, 22, 24, 18, 20, 22, 16, 14, 24, 16, 16, 22,
      ],
      I = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 6, 6, 6,
        1, 1, 1, 1, 1, 1,
      ],
      y = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 6, 6, 6,
        1, 2, 1, 2, 2, 2,
      ],
      H = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 4, 4, 4, 4, 6, 6, 8, 8,
        1, 1, 1, 1, 1, 1,
      ],
      R = [
        -255, 255, 1, 240, 2, 225, 241, 53, 3, 38, 226, 133, 242, 43, 54, 210,
        4, 195, 39, 114, 227, 106, 134, 28, 243, 140, 44, 23, 55, 118, 211, 234,
        5, 219, 196, 96, 40, 222, 115, 103, 228, 78, 107, 125, 135, 8, 29, 162,
        244, 186, 141, 180, 45, 99, 24, 49, 56, 13, 119, 153, 212, 199, 235, 91,
        6, 76, 220, 217, 197, 11, 97, 184, 41, 36, 223, 253, 116, 138, 104, 193,
        229, 86, 79, 171, 108, 165, 126, 145, 136, 34, 9, 74, 30, 32, 163, 84,
        245, 173, 187, 204, 142, 81, 181, 190, 46, 88, 100, 159, 25, 231, 50,
        207, 57, 147, 14, 67, 120, 128, 154, 248, 213, 167, 200, 63, 236, 110,
        92, 176, 7, 161, 77, 124, 221, 102, 218, 95, 198, 90, 12, 152, 98, 48,
        185, 179, 42, 209, 37, 132, 224, 52, 254, 239, 117, 233, 139, 22, 105,
        27, 194, 113, 230, 206, 87, 158, 80, 189, 172, 203, 109, 175, 166, 62,
        127, 247, 146, 66, 137, 192, 35, 252, 10, 183, 75, 216, 31, 83, 33, 73,
        164, 144, 85, 170, 246, 65, 174, 61, 188, 202, 205, 157, 143, 169, 82,
        72, 182, 215, 191, 251, 47, 178, 89, 151, 101, 94, 160, 123, 26, 112,
        232, 21, 51, 238, 208, 131, 58, 69, 148, 18, 15, 16, 68, 17, 121, 149,
        129, 19, 155, 59, 249, 70, 214, 250, 168, 71, 201, 156, 64, 60, 237,
        130, 111, 20, 93, 122, 177, 150,
      ],
      z = [
        1, 2, 4, 8, 16, 32, 64, 128, 45, 90, 180, 69, 138, 57, 114, 228, 229,
        231, 227, 235, 251, 219, 155, 27, 54, 108, 216, 157, 23, 46, 92, 184,
        93, 186, 89, 178, 73, 146, 9, 18, 36, 72, 144, 13, 26, 52, 104, 208,
        141, 55, 110, 220, 149, 7, 14, 28, 56, 112, 224, 237, 247, 195, 171,
        123, 246, 193, 175, 115, 230, 225, 239, 243, 203, 187, 91, 182, 65, 130,
        41, 82, 164, 101, 202, 185, 95, 190, 81, 162, 105, 210, 137, 63, 126,
        252, 213, 135, 35, 70, 140, 53, 106, 212, 133, 39, 78, 156, 21, 42, 84,
        168, 125, 250, 217, 159, 19, 38, 76, 152, 29, 58, 116, 232, 253, 215,
        131, 43, 86, 172, 117, 234, 249, 223, 147, 11, 22, 44, 88, 176, 77, 154,
        25, 50, 100, 200, 189, 87, 174, 113, 226, 233, 255, 211, 139, 59, 118,
        236, 245, 199, 163, 107, 214, 129, 47, 94, 188, 85, 170, 121, 242, 201,
        191, 83, 166, 97, 194, 169, 127, 254, 209, 143, 51, 102, 204, 181, 71,
        142, 49, 98, 196, 165, 103, 206, 177, 79, 158, 17, 34, 68, 136, 61, 122,
        244, 197, 167, 99, 198, 161, 111, 222, 145, 15, 30, 60, 120, 240, 205,
        183, 67, 134, 33, 66, 132, 37, 74, 148, 5, 10, 20, 40, 80, 160, 109,
        218, 153, 31, 62, 124, 248, 221, 151, 3, 6, 12, 24, 48, 96, 192, 173,
        119, 238, 241, 207, 179, 75, 150, 1,
      ];
    function O(r, t) {
      return r ^ t;
    }
    function k(r) {
      var t,
        e = [];
      for (t = 0; t < 8; t++) e[t] = r & (128 >> t) ? 1 : 0;
      return e;
    }
    function F(r, t, e, n, o, a, i) {
      var c = X;
      c(r, t, e[0], n - 2, o - 2, a, i),
        c(r, t, e[1], n - 2, o - 1, a, i),
        c(r, t, e[2], n - 1, o - 2, a, i),
        c(r, t, e[3], n - 1, o - 1, a, i),
        c(r, t, e[4], n - 1, o, a, i),
        c(r, t, e[5], n, o - 2, a, i),
        c(r, t, e[6], n, o - 1, a, i),
        c(r, t, e[7], n, o, a, i);
    }
    function X(r, t, e, n, o, a, i) {
      n < 0 && ((n += a), (o += 4 - ((a + 4) % 8))),
        o < 0 && ((o += i), (n += 4 - ((i + 4) % 8))),
        1 !== t[n][o] && ((r[n][o] = e), (t[n][o] = 1));
    }
    return function (r, t) {
      var e,
        n = (function (r) {
          var t,
            e,
            n = [],
            o = 0;
          for (t = 0; t < r.length; t++)
            127 < (e = r.charCodeAt(t))
              ? ((n[o] = 235), (e -= 127), o++)
              : 48 <= e &&
                e <= 57 &&
                t + 1 < r.length &&
                48 <= r.charCodeAt(t + 1) &&
                r.charCodeAt(t + 1) <= 57
              ? ((e = 10 * (e - 48) + (r.charCodeAt(t + 1) - 48)),
                (e += 130),
                t++)
              : e++,
              (n[o] = e),
              o++;
          return n;
        })(r),
        o = n.length,
        a = (function (r, t) {
          var e = 0;
          if ((r < 1 || 1558 < r) && !t) return -1;
          if ((r < 1 || 49 < r) && t) return -1;
          for (t && (e = 24); x[e] < r; ) e++;
          return e;
        })(o, t),
        i = x[a],
        c = C[a],
        f = i + c,
        h = I[a],
        l = y[a],
        u = S[a],
        g = w[a],
        s = N[a] - 2 * h,
        d = W[a] - 2 * l,
        v = H[a],
        A = c / v,
        p = [],
        b = [],
        m = [];
      for (
        (function (r, t, e) {
          var n, o;
          if (!(e <= t))
            for (r[t] = 129, o = t + 1; o < e; o++)
              (n = ((149 * (o + 1)) % 253) + 1), (r[o] = (129 + n) % 254);
        })(n, o, i),
          (function (r, t, e, n, o) {
            var a,
              i,
              c,
              f,
              h,
              l = 0,
              u = r / o,
              g = [];
            for (c = 0; c < o; c++) {
              for (a = 0; a < u; a++) g[a] = 0;
              for (a = c; a < e; a += o)
                for (l = O(n[a], g[u - 1]), i = u - 1; 0 <= i; i--)
                  (g[i] = l
                    ? ((f = l), (h = t[i]), f && h ? z[(R[f] + R[h]) % 255] : 0)
                    : 0),
                    0 < i && (g[i] = O(g[i - 1], g[i]));
              for (i = e + c, a = u - 1; 0 <= a; a--) (n[i] = g[a]), (i += o);
            }
          })(
            c,
            (function (r) {
              var t,
                e,
                n,
                o,
                a = [];
              for (t = 0; t <= r; t++) a[t] = 1;
              for (t = 1; t <= r; t++)
                for (e = t - 1; 0 <= e; e--)
                  (a[e] =
                    ((n = a[e]),
                    (o = t),
                    n ? (o ? z[(R[n] + o) % 255] : n) : 0)),
                    0 < e && (a[e] = O(a[e], a[e - 1]));
              return a;
            })(A),
            i,
            n,
            v
          ),
          e = 0;
        e < f;
        e++
      )
        p[e] = k(n[e]);
      for (e = 0; e < d; e++) (b[e] = []), (m[e] = []);
      return (
        (s * d) % 8 == 4 &&
          ((b[s - 2][d - 2] = 1),
          (b[s - 1][d - 1] = 1),
          (b[s - 1][d - 2] = 0),
          (b[s - 2][d - 1] = 0),
          (m[s - 2][d - 2] = 1),
          (m[s - 1][d - 1] = 1),
          (m[s - 1][d - 2] = 1),
          (m[s - 2][d - 1] = 1)),
        (function (r, t, e, n, o, a) {
          var i = 0,
            c = 4,
            f = 0;
          do {
            for (
              c !== t || f
                ? r < 3 && c === t - 2 && !f && e % 4
                  ? ((y = o),
                    (H = a),
                    (R = n[i]),
                    (z = t),
                    (O = e),
                    (k = void 0),
                    (k = X)(y, H, R[0], z - 3, 0, z, O),
                    k(y, H, R[1], z - 2, 0, z, O),
                    k(y, H, R[2], z - 1, 0, z, O),
                    k(y, H, R[3], 0, O - 4, z, O),
                    k(y, H, R[4], 0, O - 3, z, O),
                    k(y, H, R[5], 0, O - 2, z, O),
                    k(y, H, R[6], 0, O - 1, z, O),
                    k(y, H, R[7], 1, O - 1, z, O),
                    i++)
                  : c !== t - 2 || f || e % 8 != 4
                  ? c === t + 4 &&
                    2 === f &&
                    e % 8 == 0 &&
                    ((W = o),
                    (x = a),
                    (C = n[i]),
                    (S = t),
                    (w = e),
                    (I = void 0),
                    (I = X)(W, x, C[0], S - 1, 0, S, w),
                    I(W, x, C[1], S - 1, w - 1, S, w),
                    I(W, x, C[2], 0, w - 3, S, w),
                    I(W, x, C[3], 0, w - 2, S, w),
                    I(W, x, C[4], 0, w - 1, S, w),
                    I(W, x, C[5], 1, w - 3, S, w),
                    I(W, x, C[6], 1, w - 2, S, w),
                    I(W, x, C[7], 1, w - 1, S, w),
                    i++)
                  : ((v = o),
                    (A = a),
                    (p = n[i]),
                    (b = t),
                    (m = e),
                    (N = void 0),
                    (N = X)(v, A, p[0], b - 3, 0, b, m),
                    N(v, A, p[1], b - 2, 0, b, m),
                    N(v, A, p[2], b - 1, 0, b, m),
                    N(v, A, p[3], 0, m - 2, b, m),
                    N(v, A, p[4], 0, m - 1, b, m),
                    N(v, A, p[5], 1, m - 1, b, m),
                    N(v, A, p[6], 2, m - 1, b, m),
                    N(v, A, p[7], 3, m - 1, b, m),
                    i++)
                : ((h = o),
                  (l = a),
                  (u = n[i]),
                  (g = t),
                  (s = e),
                  (d = void 0),
                  (d = X)(h, l, u[0], g - 1, 0, g, s),
                  d(h, l, u[1], g - 1, 1, g, s),
                  d(h, l, u[2], g - 1, 2, g, s),
                  d(h, l, u[3], 0, s - 2, g, s),
                  d(h, l, u[4], 0, s - 1, g, s),
                  d(h, l, u[5], 1, s - 1, g, s),
                  d(h, l, u[6], 2, s - 1, g, s),
                  d(h, l, u[7], 3, s - 1, g, s),
                  i++);
              c < t &&
                0 <= f &&
                1 !== a[c][f] &&
                (F(o, a, n[i], c, f, t, e), i++),
                (f += 2),
                0 <= (c -= 2) && f < e;

            );
            for (
              c += 1, f += 3;
              0 <= c &&
                f < e &&
                1 !== a[c][f] &&
                (F(o, a, n[i], c, f, t, e), i++),
                (f -= 2),
                (c += 2) < t && 0 <= f;

            );
            (c += 3), (f += 1);
          } while (c < t || f < e);
          var h, l, u, g, s, d;
          var v, A, p, b, m, N;
          var W, x, C, S, w, I;
          var y, H, R, z, O, k;
        })(0, s, d, p, b, m),
        (b = (function (r, t, e, n, o) {
          var a,
            i,
            c = (n + 2) * t,
            f = (o + 2) * e,
            h = [];
          for (h[0] = [], i = 0; i < f + 2; i++) h[0][i] = 0;
          for (a = 0; a < c; a++)
            for (
              h[a + 1] = [], h[a + 1][0] = 0, i = h[a + 1][f + 1] = 0;
              i < f;
              i++
            )
              h[a + 1][i + 1] =
                a % (n + 2) == 0
                  ? i % 2
                    ? 0
                    : 1
                  : a % (n + 2) === n + 1
                  ? 1
                  : i % (o + 2) === o + 1
                  ? a % 2
                    ? 1
                    : 0
                  : i % (o + 2) == 0
                  ? 1
                  : ((h[a + 1][i + 1] = 0),
                    r[a - 1 - 2 * parseInt(a / (n + 2), 10)][
                      i - 1 - 2 * parseInt(i / (o + 2), 10)
                    ]);
          for (h[c + 1] = [], i = 0; i < f + 2; i++) h[c + 1][i] = 0;
          return h;
        })(b, h, l, u, g))
      );
    };
  })();
  function R(r) {
    var t = typeof r;
    return "string" === t
      ? ((r = r.replace(/[^0-9-.]/g, "")),
        (r = parseInt(1 * r, 10)),
        isNaN(r) || !isFinite(r) ? 0 : r)
      : "number" === t && isFinite(r)
      ? Math.floor(r)
      : 0;
  }
  function z(r, t) {
    var e,
      n = "";
    for (e = 0; e < t; e++) (n += String.fromCharCode(255 & r)), (r >>= 8);
    return n;
  }
  function O(r, t, e) {
    return (
      String.fromCharCode(e) + String.fromCharCode(t) + String.fromCharCode(r)
    );
  }
  function k(r) {
    var t = parseInt("0x" + r.substr(1), 16),
      e = 255 & t;
    return O((t >>= 8) >> 8, 255 & t, e);
  }
  function F(r) {
    return r.match(/#[0-91-F]/gi);
  }
  function X(r) {
    for (
      var t,
        e,
        n,
        o,
        a,
        i,
        c,
        f = "",
        h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        l = 0;
      l < r.length;

    )
      (o = (t = r.charCodeAt(l++)) >> 2),
        (a = ((3 & t) << 4) | ((e = r.charCodeAt(l++)) >> 4)),
        (i = ((15 & e) << 2) | ((n = r.charCodeAt(l++)) >> 6)),
        (c = 63 & n),
        isNaN(e) ? (i = c = 64) : isNaN(n) && (c = 64),
        (f += h.charAt(o) + h.charAt(a) + h.charAt(i) + h.charAt(c));
    return f;
  }
  function f(r) {
    var t,
      e = [];
    for (e[0] = [], t = 0; t < r.length; t++)
      e[0][t] = parseInt(r.charAt(t), 10);
    return e;
  }
  function Y(r, t) {
    return (
      r
        .css("padding", "0")
        .css("overflow", "auto")
        .css("width", t + "px")
        .html(""),
      r
    );
  }
  function i(r, t, e, n, o, a) {
    var i,
      c,
      f,
      h,
      l,
      u,
      g,
      s,
      d,
      v = e.length,
      A = e[0].length,
      p = F(t.bgColor) ? k(t.bgColor) : O(255, 255, 255),
      b = F(t.color) ? k(t.color) : O(0, 0, 0),
      m = "",
      N = "",
      W = "";
    for (i = 0; i < o; i++) (m += p), (N += b);
    for (
      u = (o * A + (l = (4 - ((o * A * 3) % 4)) % 4)) * a * v, i = 0;
      i < l;
      i++
    )
      W += "\0";
    for (
      g =
        "BM" +
        z(54 + u, 4) +
        "\0\0\0\0" +
        z(54, 4) +
        z(40, 4) +
        z(o * A, 4) +
        z(a * v, 4) +
        z(1, 2) +
        z(24, 2) +
        "\0\0\0\0" +
        z(u, 4) +
        z(2835, 4) +
        z(2835, 4) +
        z(0, 4) +
        z(0, 4),
        c = v - 1;
      0 <= c;
      c--
    ) {
      for (s = "", f = 0; f < A; f++) s += e[c][f] ? N : m;
      for (s += W, h = 0; h < a; h++) g += s;
    }
    (d = document.createElement("object")).setAttribute("type", "image/bmp"),
      d.setAttribute("data", "data:image/bmp;base64," + X(g)),
      Y(r, o * A + l).append(d);
  }
  function c(r, t, e, n, o, a) {
    var i,
      c,
      f,
      h,
      l = e.length,
      u = e[0].length,
      g = "",
      s =
        '<div style="float: left; font-size: 0; background-color: ' +
        t.bgColor +
        "; height: " +
        a +
        'px; width: &Wpx"></div>',
      d =
        '<div style="float: left; font-size: 0; width:0; border-left: &Wpx solid ' +
        t.color +
        "; height: " +
        a +
        'px;"></div>';
    for (c = 0; c < l; c++) {
      for (f = 0, h = e[c][0], i = 0; i < u; i++)
        h === e[c][i]
          ? f++
          : ((g += (h ? d : s).replace("&W", f * o)), (h = e[c][i]), (f = 1));
      0 < f && (g += (h ? d : s).replace("&W", f * o));
    }
    t.showHRI &&
      (g +=
        '<div style="clear:both; width: 100%; background-color: ' +
        t.bgColor +
        "; color: " +
        t.color +
        "; text-align: center; font-size: " +
        t.fontSize +
        "px; margin-top: " +
        t.marginHRI +
        'px;">' +
        n +
        "</div>"),
      Y(r, o * u).html(g);
  }
  function l(r, t, e, n, o, a) {
    var i,
      c,
      f,
      h,
      l,
      u,
      g,
      s,
      d = e.length,
      v = e[0].length,
      A = o * v,
      p = a * d;
    for (
      t.showHRI && ((f = R(t.fontSize)), (p += R(t.marginHRI) + f)),
        h =
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
          A +
          '" height="' +
          p +
          '">',
        h +=
          '<rect width="' +
          A +
          '" height="' +
          p +
          '" x="0" y="0" fill="' +
          t.bgColor +
          '" />',
        l =
          '<rect width="&W" height="' +
          a +
          '" x="&X" y="&Y" fill="' +
          t.color +
          '" />',
        c = 0;
      c < d;
      c++
    ) {
      for (u = 0, g = e[c][0], i = 0; i < v; i++)
        g === e[c][i]
          ? u++
          : (g &&
              (h += l
                .replace("&W", u * o)
                .replace("&X", (i - u) * o)
                .replace("&Y", c * a)),
            (g = e[c][i]),
            (u = 1));
      u &&
        g &&
        (h += l
          .replace("&W", u * o)
          .replace("&X", (v - u) * o)
          .replace("&Y", c * a));
    }
    t.showHRI &&
      ((h += '<g transform="translate(' + Math.floor(A / 2) + ' 0)">'),
      (h +=
        '<text y="' +
        (p - Math.floor(f / 2)) +
        '" text-anchor="middle" style="font-family: Arial; font-size: ' +
        f +
        'px;" fill="' +
        t.color +
        '">' +
        n +
        "</text>"),
      (h += "</g>")),
      (h += "</svg>"),
      (s = document.createElement("img")).setAttribute(
        "src",
        "data:image/svg+xml;base64," + X(h)
      ),
      Y(r, A).append(s);
  }
  function u(r, t, e, n, o, a, i, c) {
    var f,
      h,
      l,
      u,
      g,
      s,
      d = r.get(0),
      v = e.length,
      A = e[0].length;
    if (d && d.getContext) {
      for (
        (l = d.getContext("2d")).lineWidth = 1,
          l.lineCap = "butt",
          l.fillStyle = t.bgColor,
          l.fillRect(o, a, A * i, v * c),
          l.fillStyle = t.color,
          h = 0;
        h < v;
        h++
      ) {
        for (u = 0, g = e[h][0], f = 0; f < A; f++)
          g === e[h][f]
            ? u++
            : (g && l.fillRect(o + (f - u) * i, a + h * c, i * u, c),
              (g = e[h][f]),
              (u = 1));
        u && g && l.fillRect(o + (A - u) * i, a + h * c, i * u, c);
      }
      t.showHRI &&
        ((s = l.measureText(n)),
        l.fillText(
          n,
          o + Math.floor((A * i - s.width) / 2),
          a + v * c + t.fontSize + t.marginHRI
        ));
    }
  }
  var M = {
    bmp: function (r, t, e, n) {
      var o = R(t.barWidth),
        a = R(t.barHeight);
      i(r, t, f(e), 0, o, a);
    },
    bmp2: function (r, t, e, n) {
      var o = R(t.moduleSize);
      i(r, t, e, 0, o, o);
    },
    css: function (r, t, e, n) {
      var o = R(t.barWidth),
        a = R(t.barHeight);
      c(r, t, f(e), n, o, a);
    },
    css2: function (r, t, e, n) {
      var o = R(t.moduleSize);
      c(r, t, e, n, o, o);
    },
    svg: function (r, t, e, n) {
      var o = R(t.barWidth),
        a = R(t.barHeight);
      l(r, t, f(e), n, o, a);
    },
    svg2: function (r, t, e, n) {
      var o = R(t.moduleSize);
      l(r, t, e, n, o, o);
    },
    canvas: function (r, t, e, n) {
      var o = R(t.barWidth),
        a = R(t.barHeight),
        i = R(t.posX),
        c = R(t.posY);
      u(r, t, f(e), n, i, c, o, a);
    },
    canvas2: function (r, t, e, n) {
      var o = R(t.moduleSize);
      u(r, t, e, n, R(t.posX), R(t.posY), o, o);
    },
  };
  g.fn.barcode = function (r, t, e) {
    var n,
      o,
      a,
      i,
      c,
      f,
      h = "",
      l = "",
      u = !1;
    if (
      ((n = (r = g.extend(
        { crc: !0, rect: !1 },
        "object" == typeof r ? r : { code: r }
      )).code),
      (o = r.crc),
      (a = r.rect),
      n)
    ) {
      switch (((e = g.extend(!0, s, e)), t)) {
        case "std25":
        case "int25":
          (h = d(n, o, t)), (l = d(n, o, t));
          break;
        case "ean8":
        case "ean13":
          (h = m(n, t)), (l = N(n, t));
          break;
        case "upc":
          (f = n).length < 12 && (f = "0" + f),
            (h = m(f, "ean13")),
            (c = n).length < 12 && (c = "0" + c),
            (l = N(c, "ean13").substr(1));
          break;
        case "code11":
          (h = (function (r) {
            var t,
              e,
              n,
              o,
              a,
              i,
              c,
              f,
              h = "0123456789-",
              l = "10110010";
            for (n = 0; n < r.length; n++) {
              if ((o = h.indexOf(r.charAt(n))) < 0) return "";
              l += W[o] + "0";
            }
            for (c = 1, f = i = a = 0, n = r.length - 1; 0 <= n; n--)
              (c = 10 === c ? 1 : c + 1),
                (i +=
                  (a = 10 === a ? 1 : a + 1) * (o = h.indexOf(r.charAt(n)))),
                (f += c * o);
            return (
              (e = (f += t = i % 11) % 11),
              (l += W[t] + "0"),
              10 <= r.length && (l += W[e] + "0"),
              (l += "1011001")
            );
          })(n)),
            (l = n);
          break;
        case "code39":
          (h = (function (r) {
            var t,
              e,
              n = "";
            if (0 <= r.indexOf("*")) return "";
            for (r = ("*" + r + "*").toUpperCase(), t = 0; t < r.length; t++) {
              if (
                (e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*".indexOf(
                  r.charAt(t)
                )) < 0
              )
                return "";
              0 < t && (n += "0"), (n += x[e]);
            }
            return n;
          })(n)),
            (l = n);
          break;
        case "code93":
          (h = (function (r, t) {
            var e,
              n,
              o,
              a,
              i,
              c,
              f,
              h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%____*",
              l = "";
            if (0 <= r.indexOf("*")) return "";
            for (r = r.toUpperCase(), l += C[47], n = 0; n < r.length; n++) {
              if (((e = r.charAt(n)), (o = h.indexOf(e)), "_" === e || o < 0))
                return "";
              l += C[o];
            }
            if (t) {
              for (c = 1, f = i = a = 0, n = r.length - 1; 0 <= n; n--)
                (c = 15 === c ? 1 : c + 1),
                  (i +=
                    (a = 20 === a ? 1 : a + 1) * (o = h.indexOf(r.charAt(n)))),
                  (f += c * o);
              (l += C[(e = i % 47)]), (l += C[(f += e) % 47]);
            }
            return (l += C[47]), (l += "1");
          })(n, o)),
            (l = n);
          break;
        case "code128":
          (h = (function (r) {
            var t,
              e,
              n,
              o,
              a,
              i =
                " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
              c = 0,
              f = 0,
              h = 0;
            for (t = 0; t < r.length; t++)
              if (-1 === i.indexOf(r.charAt(t))) return "";
            for (n = 1 < r.length, t = 0; t < 3 && t < r.length; t++)
              (e = r.charAt(t)), (n = n && "0" <= e && e <= "9");
            for (o = S[(a = n ? 105 : 104)], t = 0; t < r.length; ) {
              if (n)
                (t === r.length ||
                  r.charAt(t) < "0" ||
                  "9" < r.charAt(t) ||
                  r.charAt(t + 1) < "0" ||
                  "9" < r.charAt(t + 1)) &&
                  ((n = !1), (o += S[100]), (a += 100 * ++c));
              else {
                for (
                  f = 0;
                  t + f < r.length &&
                  "0" <= r.charAt(t + f) &&
                  r.charAt(t + f) <= "9";

                )
                  f++;
                (n = 5 < f || (t + f - 1 === r.length && 3 < f)) &&
                  ((o += S[99]), (a += 99 * ++c));
              }
              n
                ? ((h = R(r.charAt(t) + r.charAt(t + 1))), (t += 2))
                : ((h = i.indexOf(r.charAt(t))), (t += 1)),
                (o += S[h]),
                (a += ++c * h);
            }
            return (o += S[a % 103]), (o += S[106]), (o += "11");
          })(n)),
            (l = n);
          break;
        case "codabar":
          (h = (function (r) {
            var t, e, n;
            for (n = w[16] + "0", t = 0; t < r.length; t++) {
              if ((e = "0123456789-$:/.+".indexOf(r.charAt(t))) < 0) return "";
              n += w[e] + "0";
            }
            return (n += w[16]);
          })(n)),
            (l = n);
          break;
        case "msi":
          (h = (function (r) {
            var t,
              e = 0,
              n = "110";
            for (r = y(r, !1), t = 0; t < r.length; t++) {
              if ((e = "0123456789".indexOf(r.charAt(t))) < 0) return "";
              n += I[e];
            }
            return (n += "1001");
          })(n)),
            (l = y(n, o));
          break;
        case "datamatrix":
          (h = H(n, a)), (l = n), (u = !0);
      }
      h.length &&
        (!u && e.addQuietZone && (h = "0000000000" + h + "0000000000"),
        (i = M[e.output + (u ? "2" : "")]) &&
          this.each(function () {
            i(g(this), e, h, l);
          }));
    }
    return this;
  };
})(jQuery);
