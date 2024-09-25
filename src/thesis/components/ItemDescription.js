import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import WishButton from '@/commons/components/WishButton';
import { color } from '@/theme/color';
import fontSize from '@/theme/fontSize';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaFileArrowDown } from 'react-icons/fa6';

const { gray, navy, black } = color;

const { small, normal, big } = fontSize;

const Wrapper = styled.div`
  word-break: break-all;
  position: relative;

  dl {
    padding: 15px;
    line-height: 170%;
  }

  dt {
    width: 140px;
    font-weight: bold;
    font-size: ${normal};
    margin-bottom: 10px;
  }

  dd {
    font-size: ${normal};
  }

  dl + dl {
    border-top: 1px solid ${gray};
  }

  button {
    width: 100px;
    height: 40px;
  }

  .btn-group {
    display: flex;
    gap: 30px;
    margin: 20px 0 0 10px;
    // justify-content: center;
  }
  .title {
    font-size: ${big};
    padding: 0 0 15px 15px;
    width: 95%;
  }

  .info2_wrap {
    margin: 40px 0;
    border-top: 2px solid ${black};
  }

  .toggle {
    width: 100%;
    position: relative;
    margin-top: 5px;
    display: flex;
    align-items: center;

    .arrow {
      position: absolute;
      right: 10px;
    }
  }
  .wishButton {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .file_down {
    margin-top: 40px;
    border-top: 2px solid ${black};
    font-size: ${normal};
    padding: 15px;

    p {
      margin: 0;
    }
    .fileList {
      font-weight: bold;
      margin-bottom: 20px;
    }

    li > a {
      display: flex;
      align-items: center;
      > p {
        width: 95%;
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;

const ItemDescription = ({ item }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState({});

  const {
    tid,
    title,
    poster,
    contributor,
    _fields,
    category,
    thAbstract,
    toc,
    reference,
    publisher,
    keywords,
    viewCount,
    fileInfo,
  } = item;

  console.log('file', fileInfo);

  const toggleInfo = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Wrapper>
      <div className="wishButton">
        <WishButton tid={tid}></WishButton>
      </div>

      <div className="title">{title}</div>
      {/**넣을지 말지 고민중 */}
      {/* <dl>
        <dt>{t('조회수')}</dt>
        <dd>{viewCount}</dd>
      </dl> */}

      <div className="info_wrap">
        <dl>
          <dt>{t('저자')}</dt>
          <dd>{poster}</dd>
        </dl>
        {contributor && (
          <dl>
            <dt>{t('기여자')}</dt>
            <dd>{contributor}</dd>
          </dl>
        )}
        <dl>
          <dt>{t('학문_분류')}</dt>
          <dd>
            {_fields && Object.keys(_fields).length > 0
              ? `${Object.values(_fields)?.[0][0]} | ${
                  Object.values(_fields)?.[0][1]
                }`
              : '미분류'}
          </dd>
        </dl>
        <dl>
          <dt>{t('발행기관')}</dt>
          <dd>{publisher}</dd>
        </dl>
        {category && (
          <dl>
            <dt>{t('카테고리')}</dt>
            <dd>{category}</dd>
          </dl>
        )}
        {keywords && (
          <dl>
            <dt>{t('키워드')}</dt>
            <dd>{keywords}</dd>
          </dl>
        )}
      </div>
      <div className="file_down">
        <p className="fileList">{t('첨부파일_목록')}</p>
        {fileInfo?.length > 0 ? (
          <ul className="download">
            {fileInfo.map(({ downloadUrl, fileName }) => (
              <li key={downloadUrl}>
                <a href={downloadUrl}>
                  <FaFileArrowDown />
                  <p>{fileName}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (t('첨부파일이_없습니다'))}
      </div>
      {/* 보류 */}
      {/* <div className="btn-group">
        <button>{t('원문보기')}</button>

      </div> */}
      <div className="info2_wrap">
        <dl>
          <dt onClick={() => toggleInfo('abstract')} className="toggle">
            {t('초록')}
            <span className="arrow">
              {isOpen['abstract'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </dt>
          {isOpen['abstract'] && (
            <dd>{thAbstract ? thAbstract : t('내용이_없습니다')}</dd>
          )}
        </dl>
        <dl>
          <dt onClick={() => toggleInfo('toc')} className="toggle">
            {t('목차')}
            <span className="arrow">
              {isOpen['toc'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </dt>
          {isOpen['toc'] && <dd>{toc ? toc : t('내용이_없습니다')}</dd>}
        </dl>
        <dl>
          <dt onClick={() => toggleInfo('reference')} className="toggle">
            {t('참고문헌')}
            <span className="arrow">
              {isOpen['reference'] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </dt>
          {isOpen['reference'] && (
            <dd>{reference ? reference : t('내용이_없습니다')}</dd>
          )}
        </dl>
      </div>
    </Wrapper>
  );
};

export default React.memo(ItemDescription);
