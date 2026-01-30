   type BoardType = {
    id: string, //uuid
    name: string,
    position : number,
    owner: string //uuid
  }

  type ColumnType = {
    id: string, //uuid
    board_id : string, //uuid
    name: string,
    position: number
  }

  type CardType = {
      id : string, //uuid
      column_id : string, //uuid
      title : string,
      description: string,
      position : number,
      assignee: string //uuid
  }

  export type {BoardType, ColumnType, CardType}