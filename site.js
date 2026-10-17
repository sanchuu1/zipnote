/* Add your contact details here. Blank values are simply not shown. */
var ZIPNOTE = {
  email: "",
  phone: "",
  address: ""
};

(function () {
  var list = document.getElementById("details");
  if (list) {
    [["Email", ZIPNOTE.email, function (v) { return '<a href="mailto:' + v + '">' + v + "</a>"; }],
     ["Phone", ZIPNOTE.phone, function (v) { return '<a href="tel:' + v.replace(/\s+/g, "") + '">' + v + "</a>"; }],
     ["Address", ZIPNOTE.address, function (v) { return v; }]
    ].forEach(function (row) {
      if (!row[1]) return;
      list.insertAdjacentHTML("beforeend", "<dt>" + row[0] + "</dt><dd>" + row[2](row[1]) + "</dd>");
    });
  }

  var form = document.getElementById("enquiry");
  if (!form) return;
  var status = document.getElementById("status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "status";
    if (!ZIPNOTE.email) {
      status.className = "status err";
      status.textContent = "This form isn't connected to an email address yet, so nothing was sent.";
      return;
    }
    var f = new FormData(form);
    var subject = "Enquiry: " + (f.get("topic") || "ZipNote");
    var body = f.get("message") + "\n\nFrom: " + f.get("name") + " <" + f.get("email") + ">";
    window.location.href = "mailto:" + ZIPNOTE.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    status.textContent = "Opening your email app with your message.";
  });
})();
