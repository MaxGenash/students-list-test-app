import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Portal from "@material-ui/core/Portal";
import { MODAL_PORTAL_ID } from "../constants";
import StudentDataForm from "./StudentDataForm";

const styles = theme => ({
});

function StudentsPage(props) {
  const options = {
    filterType: 'checkbox',
    print: false,
    customToolbar() {
      return (
        <Tooltip title="Add a new record">
          <IconButton onClick={() => console.log('Clicked Add')}>
            <Icon> add </Icon>
          </IconButton>
        </Tooltip>
      );
    }
  };
  const columns = [
    {
      options: {
        customBodyRender(recordId) {
          return (
            <Tooltip title="Edit the record">
              <IconButton onClick={() => console.log('Clicked Edit record #', recordId)}>
                <Icon> edit </Icon>
              </IconButton>
            </Tooltip>
          );
        },
        filter: false,
        sort: false,
        download: false,
      }
    },
    { name: "First Name" },
    { name: "Last Name" },
    { age: "Age" },
    {
      name: "Birthday Date",
      options: {
        customBodyRender(value) {
          return new Date(value).toLocaleDateString();
        }
      }
    },
  ];

  const data = [
    ["1","Marshall Bruce","Mathers",47,"1972-10-17T00:00:00.000Z"],
    ["2","Sonny John","Moore",31,"1988-01-15T00:00:00.000Z"],
    ["5","Thomas Wesley","Pentz",41,"1978-11-10T00:00:00.000Z"]
  ];

  return (
    <section>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
      <Portal container={document.getElementById(MODAL_PORTAL_ID)}>
        <StudentDataForm />
      </Portal>
    </section>
  );
}

export default withStyles(styles)(StudentsPage);

