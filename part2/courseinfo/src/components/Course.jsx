import React from 'react'
import { Content } from './Content';

export const Course = ({course}) => {
  console.log(course);
  
    return (
      <main>
      <Content content={course} />
      </main>
    )
  }
