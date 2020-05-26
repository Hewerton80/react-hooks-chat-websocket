import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    .chat{
        border: 1px solid #222;
        .msgs{
            overflow: auto;
            width: 500px;
            height: 500px;
        }
    }
    form{
        width: 100%;
        
        span{
            display: flex;
            width: 100%;
            height: 50px;
            input{
                flex:1;
                height: 100%;
            }
            button{
                height: 100%;
            }
        }
    }
`;

