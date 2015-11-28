using System;
using System.Collections.Generic;
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

            System.Collections.Generic.List<int> theirList = new System.Collections.Generic.List<int>();

            theirList.Contains(2);
            int num = theirList.Count;
            theirList.ElementAt(3);
            theirList.IndexOf(14);
            theirList.Insert(2, 23);
            theirList.InsertRange(2, new List<int>(4, 3, 2, 1));
            theirList.Max();
            theirList.Min();
            theirList.Remove(2);
            theirList.RemoveAt(3);
            theirList.Sort();
            

            var exit = Console.Read(); //DEBUG
        }
    }
}
