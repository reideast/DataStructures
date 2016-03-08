using System;
//using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStructures
{
    class Program
    {
        static void Main(string[] args)
        {
            List<int> myList = new List<int>();
            myList.Append(1);
            myList.Append(2);
            myList.Append(3);
            Console.WriteLine(myList);

            myList = new List<int>(3, 2, 1);
            Console.WriteLine(myList);

            myList = new List<int>(new System.Collections.Generic.List<int>(new int[] { 4, 3, 2, 1 }));
            Console.WriteLine(myList);
            Console.WriteLine(myList.Length);
            Console.WriteLine(myList.Count());
            myList.AppendRange(new System.Collections.Generic.List<int>(new int[] { 4, 3, 2, 1 }));
            Console.WriteLine(myList);
            Console.WriteLine(myList.Length);
            Console.WriteLine(myList.Count());
            Console.WriteLine(myList.ElementAt(2));
            Console.WriteLine(myList.ElementAt(3));
            Console.WriteLine(myList.IndexOf(3));


            myList = new List<int>(10, 20, 30, 40);
            myList.Insert(0, 8);
            Console.WriteLine(myList);
            myList = new List<int>(10, 20, 30, 40);
            myList.Insert(1, 8);
            Console.WriteLine(myList);
            myList = new List<int>(10, 20, 30, 40);
            myList.Insert(2, 8);
            Console.WriteLine(myList);
            myList = new List<int>(10, 20, 30, 40);
            myList.Insert(4, 8);
            Console.WriteLine(myList);

            myList = new List<int>(10, 20, 30, 40);
            myList.Insert(3, 7, 8, 9);
            Console.WriteLine(myList);

            myList.Remove(7);
            Console.WriteLine(myList);
            myList.Remove(10);
            Console.WriteLine(myList);
            myList.Remove(40);
            Console.WriteLine(myList);
            myList.Remove(9);
            Console.WriteLine(myList);

            myList.RemoveAt(1);
            Console.WriteLine(myList);
            myList.RemoveAt(1);
            Console.WriteLine(myList);

            myList = new List<int>(10, 20, 30, 40);
            Console.WriteLine(myList);
            myList.Sort();
            Console.WriteLine(myList);


            myList = new List<int>(2, 3, 1, 4);
            Console.WriteLine(myList);
            myList.Sort();
            Console.WriteLine(myList);

            myList = new List<int>(4, 3, 2, 1);
            Console.WriteLine(myList);
            myList.Sort();
            Console.WriteLine(myList);

            Random rand = new Random(); //static seed!
            for (int i = 0; i < 20; i++)
            {
                myList = new List<int>();
                for (int j = 0; j < i; j++)
                    myList.Append(rand.Next() % 100);
                Console.WriteLine(myList);
                myList.Sort();
                Console.WriteLine(myList);
                Console.WriteLine();
            }

            myList = new List<int>(4, 3, 2, 1);
            foreach (int item in myList)
                Console.WriteLine(item);

            Console.WriteLine(myList[0]);
            myList[1] = 8;
            Console.WriteLine(myList[1]);
            Console.WriteLine(myList[2]);
            Console.WriteLine(myList[3]);

            myList.RemoveAt(0);
            myList.RemoveAt(0);
            myList.RemoveAt(0);
            myList.RemoveAt(0);
            foreach (int item in myList)
                Console.WriteLine(item);

            Stack<int> myStack = new Stack<int>(1, 2, 3);
            Console.WriteLine(myStack);
            myStack.push(2);
            Console.WriteLine(myStack);
            Console.WriteLine(myStack.pop().ToString());
            Console.WriteLine(myStack);
            myStack.push(5);
            myStack.push(4);
            myStack.Sort();
            Console.WriteLine(myStack);

            Queue<int> myQueue = new Queue<int>(1, 2, 3);
            Console.WriteLine(myQueue);
            myQueue.enqueue(2);
            Console.WriteLine(myQueue);
            Console.WriteLine(myQueue.dequeue().ToString());
            Console.WriteLine(myQueue);
            myQueue.enqueue(5);
            myQueue.enqueue(4);
            myQueue.Sort();
            Console.WriteLine(myQueue);

            foreach (int item in myQueue)
            {
                Console.Write(item);
            }
            Console.WriteLine();

            System.Collections.Generic.List<int> theirList = new System.Collections.Generic.List<int>();
            theirList.Add(1);
            theirList.Add(1);
            theirList.Add(1);
            theirList.

            var exit = Console.Read(); //DEBUG pause
        }
    }
}
