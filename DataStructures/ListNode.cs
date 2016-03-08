using System;

namespace DataStructures
{
    class ListNode<T> where T : IComparable<T>
    {
        private ListNode<T> _next;
        public ListNode<T> Next { get { return _next; } set { _next = value; } }
        private ListNode<T> _prev;
        public ListNode<T> Prev { get { return _prev; } set { _prev = value; } }
        private T _data;
        public T Data { get { return _data; } set { _data = value; } }

        public ListNode()
        {
            _next = null;
            _prev = null;
            _data = default(T);
        }

        public ListNode(T data)
        {
            _next = null;
            _prev = null;
            _data = data;
        }

        public ListNode(ListNode<T> next, ListNode<T> prev, T data)
        {
            _next = next;
            _prev = prev;
            _data = data;
        }

        public override string ToString()
        {
            return _data.ToString();
        }
    }
}
