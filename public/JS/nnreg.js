function nvalidate() {
    if (document.contact.name.value == "") {
        alert("Enter a name");
        document.contact.name.focus();
        return false;
    }
    if (!/^[a-zA-Z]*$/g.test(document.contact.name.value)) {
        alert("Invalid characters");
        document.contact.name.focus();
        return false;
    }
}
