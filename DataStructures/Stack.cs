using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStructures
{
    class Stack<T> : List<T> where T : IComparable<T>
    {
        public Stack() : base() { }
        public Stack(IEnumerable<T> values) : base(values) { }
        public Stack(params T[] values) : base(values) { }


        public void push(T value)
        {
            this.Append(value);
        }

        public T pop()
        {
            if (_tail != null)
            {
                T data = _tail.Data;
                _tail.Prev.Next = null;
                _tail = _tail.Prev;
                return data;
            }
            else
            {
                throw new NullReferenceException("Stack is empty.");
            }
        }
    }
}
