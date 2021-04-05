import React, {useEffect,useRef} from 'react';
import styled from 'styled-components';

/**
 .card-inverse-info {
     background: rgba(61, 165, 244, 0.2);
     border: 1px solid #3898e0;
     color: #2e7db9
 }

 .context-menu-list {
     box-shadow: none;
     border: 1px solid #f3f3f3
 }

 .context-menu-list {
     position: absolute;
     display: inline-block;
     min-width: 13em;
     max-width: 26em;
     padding: .25em 0;
     margin: .3em;
     font-family: inherit;
     font-size: inherit;
     list-style-type: none;
     background: #fff;
     border: 1px solid #bebebe;
     border-radius: .2em;
     -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
     box-shadow: 0 2px 5px rgba(0, 0, 0, .5)
 }

 .context-menu-item {
     position: relative;
     padding: 0.5em 6em;
     color: #2f2f2f;
     -webkit-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
     background-color: #fff
 }

 .context-menu-list .context-menu-item.context-menu-hover {
     background-color: black;
     color: #fff
 }

 .context-menu-separator {
     padding: 0;
     margin: .35em 0;
     border-bottom: 1px solid #e6e6e6
 }
 <ul class="context-menu-list context-menu-root" style="width: 241px; top: 188px; left: 0px; z-index: 1;"><li class="context-menu-item"><span>Edit</span></li><li class="context-menu-item context-menu-icon context-menu-icon-cut context-menu-visible"><span>Cut</span></li><li class="context-menu-item context-menu-icon context-menu-icon-copy"><span>Copy</span></li><li class="context-menu-item context-menu-icon context-menu-icon-paste"><span>Paste</span></li><li class="context-menu-item context-menu-icon context-menu-icon-delete"><span>Delete</span></li><li class="context-menu-item context-menu-separator context-menu-not-selectable"></li><li class="context-menu-item context-menu-icon context-menu-icon-quit"><span>Quit</span></li></ul>

 */
const StyledMenuList = styled.ul`
      position: absolute;
      // display: inline-block; display: none;
      display: ${props => props.show ? 'inline-block;' : 'none;'}
      min-width: 13em;
      max-width: 26em;
      padding: .25em 0;
      margin: .3em;
      font-family: inherit;
      font-size: inherit;
      list-style-type: none;
      background: #fff;
      border: 1px solid #bebebe;
      border-radius: .2em;
      -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
      box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
      // copied from the website.
      width: ${props => props.width ? `${props.width}px` : '241px'};
      top: ${props => props.top ? `${props.top}px` : '0'};
      left: ${props => props.left ? `${props.left}px` : '0'};
      z-index: 1;
`;

const StyledMenuItem = styled.li`
      position: relative;
      padding: 0.5em 1em;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-color: #fff;
      color: #212529;
      :hover {
        color: #007bff;
      }
`;

const useClickOutside = (ref, callback) => {
    const handleClick = e => {
        if ( ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(()=>{
        ref.current.addEventListener('click',handleClick);
        return () => {
            ref.current.removeEventListener('click', handleClick);
        }
    })
}
//   https://bbbootstrap.com/snippets/simple-context-menu-42706253
const ContextMenu = ({show, children, onCloseCallBack, width, x, y}) => {
    const clickRef = useRef();
    useClickOutside(clickRef, onCloseCallBack);
    return (
        <StyledMenuList show={show} ref={clickRef} width={width} top={x} left={y}>
            {React.Children.map(children, child => (<StyledMenuItem>{child}</StyledMenuItem>))}
        </StyledMenuList>
    );
}
export default ContextMenu;
