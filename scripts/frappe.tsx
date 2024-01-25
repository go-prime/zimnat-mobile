import axios from 'axios';
import React from 'react';
import {Alert} from 'react-native';
import constants from '../constants';

const frappe = {
  provide: function (namespace: string): void {
    let current = window;
    namespace.split('.').forEach(function (name) {
      current[name] = current[name] || {};
      current = current[name]
    });

  },
  flt: function (value: any, decimals: number): number {
    if ((null, undefined, '').includes(value)) {
      return 0;
    }
    if (decimals) {
      return parseFloat(new Number(value).toFixed(decimals));
    }
    return Number(value);
  },
  ui: {
    form: {
      on: function (doctype, handlers) {
        frappe.ui.form.events[doctype] = handlers
      },
      events: {},
    },
  },
  model: {
    _rebuildData() {
      const newData = locals[frm.doc.doctype][frm.doc.name]
      frm.schema.filter(s => s.fieldtype == "Table")
        .forEach(s => {
          const children = []
          Object.keys(locals[s.options]).forEach(k => {
            children.push(locals[s.options][k])
          })

          children.sort((a, b) => {
            if(a.idx < b.idx) {
              return -1
            } 
            return 1
          })
          newData[s.fieldname] = children
        })
        frm.setData(newData)
    },
    set_value(cdt, cdn, fieldname, value) {
      locals[cdt][cdn][fieldname] = value
      this._rebuildData()
      frm.script_manager.trigger(fieldname, cdt, cdn)

    },
  },
  msgprint: function (msg) {
    Alert.alert("Message", msg)
  },
  confirm: function (msg, confirm, reject) {},
  call: async function (opts) {
    if(opts.doc) {
      const res = await axios.get(`${constants.server_url}/api/method/frappe.handler.run_doc_method`, {
        params: {
          docs: JSON.stringify(opts.doc),
          method: opts.method,
          args: JSON.stringify(opts.args)
        }
      })

      return {
        message: res.data.message
      }
    } else {
      const res = await axios.get(`${constants.server_url}/api/method/${opts.method}`, {params: {
        args: JSON.stringify(opts.args)
      }})

      return {
        message: res.data.message
      }
    }
  },
  db: {
    get_value: function () {},
    get_doc: function () {},
    get_list: function () {},
  },
};

export default frappe;
