import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Portal from "@material-ui/core/Portal";
import { MODAL_PORTAL_ID } from "../constants";
import GradesDataForm from "./GradesDataForm";

const styles = theme => ({
});

function GradesPage(props) {
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
    { name: "Student" },
    { name: "Profession" },
    {
      name: "Test Date",
      options: {
        customBodyRender(value) {
          return new Date(value).toLocaleDateString();
        }
      }
    },
    { name: "Grade" },
  ];

  const data = [
    [1, "Thomas Wesley Pentz", "Electro house music", "2018-11-22T00:00:00.000Z", "A"],
    [2, "Sonny John Moore", "Dubstep music", "2012-08-12T00:00:00.000Z", "A"],
    [3, "Sonny John Moore", "Rock music", "2018-10-09T00:00:00.000Z", "D"],
    [6, "Marshall Bruce Mathers", "Hip-hop music", "2000-11-02T00:00:00.000Z", "A"],
  ];

  return (
    <section>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
      <Portal container={document.getElementById(MODAL_PORTAL_ID)}>
        <GradesDataForm />
      </Portal>
    </section>
  );
}

export default withStyles(styles)(GradesPage);
