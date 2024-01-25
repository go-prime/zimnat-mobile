class FrappeForm {
  constructor(data, setData, schema, setSchema) {
    this.doc = data;
    this.setData = setData;
    this.schema = schema;
    this.setSchema = setSchema;
    this.fields_dict = {};
    this.script_manager = {
      trigger: (a, b, c) => {
        /**
         * a - fieldname
         * b - doctype
         * c - docname
         */
        console.log({a,b,c})
        if (b) {
          if (frappe.ui.form.events[b] && frappe.ui.form.events[b][a]) {
            console.log(frappe.ui.form.events[b][a])
            console.log(JSON.stringify(window.frm))
            frappe.ui.form.events[b][a](window.frm, b, c);
          }
          return;
        }
        if (
          frappe.ui.form.events[this.doc.doctype] &&
          frappe.ui.form.events[this.doc.doctype][a]
        ) {
          frappe.ui.form.events[this.doc.doctype][a](window.frm);
        }
      },
    };
  }

  set_value(fieldname, value) {
    const newData = {...this.doc};
    newData[fieldname] = value;
    this.setData(newData);
    window.frm.doc = newData;
    this.script_manager.trigger(fieldname);
  }
  set_query(query) {}
  refresh_field(fieldname) {}
  refresh() {}
  disable_save() {}
  add_custom_button() {}
}

export default FrappeForm;
