import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';

 const Wrapper = styled.div``;

const ItemDescription = ({ item }) => {
    const {
        title,
        poster,
        contributor,
        thAbstract,
        toc,
        reference,
        publisher,
        keywords,

    } = item;
return (
    <Wrapper>
        <dl>
            <dt>논문명</dt>
            <dd>{title}</dd>
        </dl>
    </Wrapper>
    );
};

export default ItemDescription;