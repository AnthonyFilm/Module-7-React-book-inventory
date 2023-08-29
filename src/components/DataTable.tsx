import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { server_calls } from "../api/server";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetData } from "../custom-hooks/FetchData";

/* fields from the Flask app
    id = db.Column(db.String, primary_key = True)
    isbn = db.Column(db.String(13))
    author_first = db.Column(db.String(150))
    author_last = db.Column(db.String(150))
    title = db.Column(db.String(250))
    pages = db.Column(db.Integer)
    year = db.Column(db.Integer)
    medium = db.Column(db.String(100))
    description = db.Column(db.String(250), nullable=True)

*/


const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90},
    { field: 'isbn', headerName: "ISBN", flex: 1},
    { field: 'author_first', headerName: "Author First Name", flex: 1},
    { field: 'author_last', headerName: "Author Last Name", flex: 1},
    { field: 'title', headerName: "Book Title", flex: 1},
    { field: 'pages', headerName: "Pages", flex: 1},
    { field: 'year', headerName: "Publication Year", flex: 1},
    { field: 'medium', headerName: "Medium", flex: 1},
    { field: 'description', headerName: "Description", flex: 1},
]

function DataTable() {
    let [open, setOpen] = useState(false);
    const { bookData, getData } = useGetData();
    console.log(bookData);
    
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])

    const handleOpen = () => {
        setOpen(true)
        console.log(`this is the selection model ${selectionModel}`)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`);
        setTimeout( () => {window.location.reload()}, 500)    
    }

    // const onRowsSelectionHandler = (ids, rows) => {
    //     const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    //     console.log(`These are the data from the selected row ${selectedRowsData}`);
        
    // }

    return (
        <>
            <Modal
                id={selectionModel}
                open={open}
                onClose={handleClose}
            />
            <div className="flex flex-row">
                <div>
                    <button
                        className="p-3 bg-purple-300 rounded m-3 text-black hover:bg-purple-600 hover:text-white"
                        onClick={!selectionModel[0] ? () => handleOpen(): handleClose}
                    >
                        Add a New Book to Library
                    </button>
                </div>
                <Button onClick={ selectionModel[0] ?  handleOpen: handleClose} name='update'  className="p-3 bg-purple-300 rounded m-3 hover:bg-purple-800 hover:text-white">
                    Update Book
                </Button>
                <Button onClick={selectionModel[0] ? deleteData: handleClose} className="p-3 bg-purple-300 rounded m-3 hover:bg-purple-800 hover:text-white">
                    Delete Book
                </Button>
            </div>
            <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
                style={{height: 500, width: '100%'}}
            >
                <h2 className="p-3 bg-purple-300 my-2 rounded">My Book Collection</h2>
                
                    <DataGrid 
                
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                id: false
                            }
                        }}}
                    loading={bookData == null}
                    rows={bookData} 
                    columns={columns}
                    checkboxSelection={true}
                    onRowSelectionModelChange={(selection: any) => {
                        // if (selection.length > 1) {
                        //   const selectionSet = new Set(selectionModel);
                        //   const result = selection.filter((s:any) => !selectionSet.has(s));
                
                        //   setSelectionModel(result);
                        // } else {
                        setSelectionModel(selection);
                        // }
                    }}
                    // { ( item: any) => {
                    //     setSelectionModel(item);
                    // }}
                    componentsProps={{
                        pagination: {
                            rowsPerPageOptions: [5]
                        }
                    }}
                    />
               
            </div>      
        </>
    )
}

export default DataTable

