const bashConfig = ['bin/bash','-c'];
export const commands = {
    python: function(code :string,input:string){
        const runCommand=`echo '${code}' > test.py && echo '${input}' > input.txt && python test.py < input.txt`;
        return [...bashConfig,runCommand];
    },
    cpp: function(code :string,input?:string){
        const runCommand=`mkdir app && cd app && echo '${code}' > test.cpp && echo '${input}' > input.txt && g++ test.cpp -o run && ./run < input.txt`;
        return [...bashConfig,runCommand];
    }
}