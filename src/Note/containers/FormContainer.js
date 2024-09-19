import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { produce } from 'immer';
import Pagination from '../../commons/components/Pagination';
import DefaultList from '../components/skins/default/List'; // 기본 스킨
import GalleryList from '../components/skins/memo/List'; // 메모 스킨
import ListMain from '../components/skins/default/ListMain';
import { useSearchParams } from 'next/navigation';

const DefaultForm = loadable(() => import('../components/skins/default/Form'));
const MemoForm = loadable(() => import('../components/skins/Memmo/Form'));
function skinRoute(skin) {
  switch (skin) {
    case 'Memo':
      return MemoForm;
    default:
      return DefaultForm;
  }
}

const FormContainer = ({ setPageTitle }) => {
  const { nid, seq } = useParams();

}