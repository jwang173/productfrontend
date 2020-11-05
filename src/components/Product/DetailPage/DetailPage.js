import React from 'react'

function DetailPage(props) {
    return (
        <div>
            <span>
                    <form>
                        
                        <table>
                            {/* <thead>{props.type}</thead> */}
                            <tbody>
                                <tr>
                                    <td>{props.label}</td>
                                    <td>{props.content}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* {res["Description"]["id"]} */}
                    </form>
                </span>
                <span></span>
        </div>
    )
}

export default DetailPage;