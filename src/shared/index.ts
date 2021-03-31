import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Popover from "@material-ui/core/Popover";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import Pagination from "@material-ui/lab/Pagination";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import SearchIcon from "@material-ui/icons/Search";

import { FormBuilder, FieldGroup, FieldControl, Validators, FormGroup } from "react-reactive-form";

export {
  // @material-ui
  Button,
  AddIcon,
  Dialog,
  IconButton,
  DialogActions,
  DialogContent,
  CloseIcon,
  Grid,
  MoreVertIcon,
  MenuItem,
  MenuList,
  Popover,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  FormControl,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  TextField,
  Checkbox,
  Autocomplete,
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
  SearchIcon,
  Pagination,
  // react-reactive-form
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators,
  FormGroup
};

// re-exported from react-reactive-form
export type InputType = "checkbox" | "radio" | "switch";
export type Handler = {
  value: any;
  onChange: (e: any) => void;
  onBlur: (e: any) => void;
  onFocus: (e: any) => void;
  disabled: boolean;
  checked?: boolean;
  editable?: boolean;
  type?: string;
};
