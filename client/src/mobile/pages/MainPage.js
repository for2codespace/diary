import { useEffect, useState } from "react";
import query from "../components/Database";
import { Divider, Typography, Paper,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

export default function MainPage () {
  const current_date = new Date();
  return (
    <Week date={current_date}/>
  )
}

function Week ({ date }) {
  var weekday = date.getDay()+1;
  var monday_date = date.getDate() - weekday;
  var [year, month] = [date.getFullYear(), date.getMonth()];
  return (
    <>
      <Typography variant="h3"> Рассписание: </Typography>
      <Divider />
      <Day date={monday_date}   year={year} month={month} weekday={"Понедельник"} />
      <Day date={monday_date+1} year={year} month={month} weekday={"Вторник"} />
      <Day date={monday_date+2} year={year} month={month} weekday={"Среда"} />
      <Day date={monday_date+3} year={year} month={month} weekday={"Четверг"} />
      <Day date={monday_date+4} year={year} month={month} weekday={"Пятница"} />
      <Day date={monday_date+5} year={year} month={month} weekday={"Суббота"} />
    </>
  )
}

function Day ({ date, year, month, weekday }) {
  const [change, setChange] = useState(false);

  const [data, setData] = useState({
    "l1": {"subject": "", "task": "", "description": ""},
    "l2": {"subject": "", "task": "", "description": ""},
    "l3": {"subject": "", "task": "", "description": ""},
    "l4": {"subject": "", "task": "", "description": ""},
    "l5": {"subject": "", "task": "", "description": ""},
    "l6": {"subject": "", "task": "", "description": ""},
    "l7": {"subject": "", "task": "", "description": ""},
    "l8": {"subject": "", "task": "", "description": ""},
  });

  const save = () => {
    setChange(false);
    var new_data = {
      "l1": {
        "subject": document.querySelector('#l1s').value,
        "task": document.querySelector('#l1t').value,
        "description": document.querySelector('#l1d').value
      },
      "l2": {
        "subject": document.querySelector('#l2s').value,
        "task": document.querySelector('#l2t').value,
        "description": document.querySelector('#l2d').value
      },
      "l3": {
        "subject": document.querySelector('#l3s').value,
        "task": document.querySelector('#l3t').value,
        "description": document.querySelector('#l3d').value
      },
      "l4": {
        "subject": document.querySelector('#l4s').value,
        "task": document.querySelector('#l4t').value,
        "description": document.querySelector('#l4d').value
      },
      "l5": {
        "subject": document.querySelector('#l5s').value,
        "task": document.querySelector('#l5t').value,
        "description": document.querySelector('#l5d').value
      },
      "l6": {
        "subject": document.querySelector('#l6s').value,
        "task": document.querySelector('#l6t').value,
        "description": document.querySelector('#l6d').value
      },
      "l7": {
        "subject": document.querySelector('#l7s').value,
        "task": document.querySelector('#l7t').value,
        "description": document.querySelector('#l7d').value
      },
      "l8": {
        "subject": document.querySelector('#l8s').value,
        "task": document.querySelector('#l8t').value,
        "description": document.querySelector('#l8d').value
      }
    }

    let request = query("patch", new Date(year, month, date), new_data);

    if (request[0] === 202) {
      toast.success("Успешно сохранено")
    }
    else {
      toast.error("Не удалось сохранить. Попробуйте позже")
    }
  }

  useEffect(() => {
    var request = query("get", new Date(year, month, date));

    if (request[0] !== 404) {
      setData(request[1]);
    }
  }, [setData, date, year, month]);

  return (
    <div style={{ marginBottom: "20px"}}>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 380 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>{year + "." + month + "." + date} {weekday} </TableCell>
              <TableCell align="right">
              { !change ?
               <Button size="small" variant="contained" color="info" onClick={() => setChange(true)}>Изменить</Button>
               :
               <Button size="small" variant="contained" color="success" onClick={() => {save();}}>Сохранить</Button>
               }
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 380 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width={25}>#</TableCell>
              <TableCell padding={"normal"}>Предмет</TableCell>
              <TableCell>Задание</TableCell>
              <TableCell width={25}>Оценка</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">1</TableCell>
                <TableCell>{data["l1"]["subject"]}</TableCell>
                <TableCell>{data["l1"]["task"]}</TableCell>
                <TableCell  >{data["l1"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">1</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l1"]["subject"]} id="l1s" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l1"]["task"]} id="l1t" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l1"]["description"]} id="l1d" size="small"></TextField>
                </TableCell>
              </TableRow>
              }
            { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">2</TableCell>
                <TableCell  >{data["l2"]["subject"]}</TableCell>
                <TableCell  >{data["l2"]["task"]}</TableCell>
                <TableCell  >{data["l2"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">2</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l2"]["subject"]} id="l2s" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l2"]["task"]} id="l2t" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l2"]["description"]} id="l2d" size="small"></TextField>
                </TableCell>
              </TableRow>
              }
            { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">3</TableCell>
                <TableCell  >{data["l3"]["subject"]}</TableCell>
                <TableCell  >{data["l3"]["task"]}</TableCell>
                <TableCell  >{data["l3"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">3</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l3"]["subject"]} id="l3s" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l3"]["task"]} id="l3t" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l3"]["description"]} id="l3d" size="small"></TextField>
                </TableCell>
              </TableRow>
              }
            { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">4</TableCell>
                <TableCell  >{data["l4"]["subject"]}</TableCell>
                <TableCell  >{data["l4"]["task"]}</TableCell>
                <TableCell  >{data["l4"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">4</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l4"]["subject"]} id="l4s" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l4"]["task"]} id="l4t" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l4"]["description"]} id="l4d" size="small"></TextField>
                </TableCell>
              </TableRow>
              }
            { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">5</TableCell>
                <TableCell  >{data["l5"]["subject"]}</TableCell>
                <TableCell  >{data["l5"]["task"]}</TableCell>
                <TableCell  >{data["l5"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">5</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l5"]["subject"]} id="l5s" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l5"]["task"]} id="l5t" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l5"]["description"]} id="l5d" size="small"></TextField>
                </TableCell>
              </TableRow>
              }
              { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">6</TableCell>
                <TableCell  >{data["l6"]["subject"]}</TableCell>
                <TableCell  >{data["l6"]["task"]}</TableCell>
                <TableCell  >{data["l6"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">6</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l6"]["subject"]} id="l6s" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l6"]["task"]} id="l6t" size="small"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l6"]["description"]} id="l6d" size="small"></TextField>
                </TableCell>
              </TableRow>
              }
              { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">7</TableCell>
                <TableCell  >{data["l7"]["subject"]}</TableCell>
                <TableCell  >{data["l7"]["task"]}</TableCell>
                <TableCell  >{data["l7"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">7</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l7"]["subject"]} size="small" id="l7s"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l7"]["task"]} size="small" id="l7t"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l7"]["description"]} size="small" id="l7d"></TextField>
                </TableCell>
              </TableRow>
              }
              { !change ? 
              <TableRow>              
                <TableCell component="th" scope="row">8</TableCell>
                <TableCell  >{data["l8"]["subject"]}</TableCell>
                <TableCell  >{data["l8"]["task"]}</TableCell>
                <TableCell  >{data["l8"]["description"]}</TableCell>
              </TableRow>
                :
              <TableRow>
                <TableCell component="th" scope="row">8</TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l8"]["subject"]} size="small" id="l8s"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField variant="outlined" defaultValue={data["l8"]["task"]} size="small" id="l8t"></TextField>
                </TableCell>
                <TableCell  >
                  <TextField width={25} variant="outlined" defaultValue={data["l8"]["description"]} size="small" id="l8d"></TextField>
                </TableCell>
              </TableRow>
              }
              
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}